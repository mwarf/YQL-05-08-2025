import sharp from "sharp";
import { glob } from "glob";
import { mkdir, writeFile, readFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import matter from 'gray-matter';

// --- Configuration ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

const sourceDir = path.join(projectRoot, "src", "images");
const contentDir = path.join(projectRoot, "src", "content", "gallery");
const outputDir = path.join(projectRoot, "public", "optimized-images");
const dimensionsFilePath = path.join(projectRoot, "src", "data", "image_dimensions.json");
const targetWidths = [400, 800, 1200, 1920];
const webpQuality = 80;
// --- End Configuration ---

// Helper function to extract image path from frontmatter
function getImagePathFromFrontmatter(content) {
  try {
    const { data } = matter(content);
    if (typeof data.image === 'string') {
      return data.image;
    } else if (typeof data.image === 'object' && data.image !== null && typeof data.image.src === 'string') {
      return data.image.src;
    }
  } catch (e) {
    console.warn(`Could not parse frontmatter: ${e.message}`);
  }
  return null;
}

async function optimizeAndExtractDimensions() {
  console.log(`Starting image processing...`);
  console.log(`Content directory: ${contentDir}`);
  console.log(`Source image directory: ${sourceDir}`);
  console.log(`Output directory: ${outputDir}`);
  console.log(`Dimensions file: ${dimensionsFilePath}`);

  const imageDimensions = {}; // Key: markdown filename (no ext), Value: { width, height, relativePath }
  let processedImageCount = 0;
  let errorCount = 0;

  try {
    // --- Step 1: Extract Dimensions & Paths from Content Files ---
    console.log("\n--- Extracting Dimensions & Paths from Content ---");
    const markdownFiles = await glob("**/*.md", { cwd: contentDir, absolute: true });
    console.log(`Found ${markdownFiles.length} gallery markdown files.`);

    for (const mdPath of markdownFiles) {
      const mdFilename = path.basename(mdPath);
      const mdKey = mdFilename.replace(/\.md$/, ''); // Key for the JSON object

      try {
        const mdContent = await readFile(mdPath, 'utf-8');
        const imagePathRelativeMd = getImagePathFromFrontmatter(mdContent); // e.g., ../../images/drone-bts/file.jpg

        if (!imagePathRelativeMd) {
          console.warn(`No image path found in frontmatter for ${mdFilename}, skipping dimension extraction.`);
          continue;
        }

        // Resolve the absolute path to the source image
        const imageAbsPath = path.resolve(path.dirname(mdPath), imagePathRelativeMd);

        // Derive the relative path key (relative to src/images) for constructing optimized URLs later
        const pathParts = imagePathRelativeMd.split('/');
        if (pathParts.length < 4 || pathParts[pathParts.length - 3] !== 'images') {
            console.warn(`Unexpected image path structure in ${mdFilename}: ${imagePathRelativeMd}, skipping dimension extraction.`);
            continue;
        }
        const relativeImagePathKey = pathParts.slice(-2).join('/'); // e.g., drone-bts/file.jpg

        // Get dimensions using sharp
        const image = sharp(imageAbsPath);
        const metadata = await image.metadata();
        const originalWidth = metadata.width;
        const originalHeight = metadata.height;

        if (!originalWidth || !originalHeight) {
          console.warn(`Could not get dimensions for image ${relativeImagePathKey} referenced in ${mdFilename}, skipping.`);
          continue;
        }

        // Store dimensions and the relative path using the markdown filename key
        imageDimensions[mdKey] = {
            width: originalWidth,
            height: originalHeight,
            relativePath: relativeImagePathKey, // Store the path needed for URL construction
        };
        console.log(`Extracted data for: ${mdKey} -> ${relativeImagePathKey}`);

      } catch (err) {
        // Catch errors reading file or processing image for this specific markdown file
        if (err.code === 'ENOENT') {
             console.error(`Error processing ${mdFilename}: Source image not found at ${err.path}`);
        } else {
            console.error(`Error processing markdown file ${mdFilename}:`, err.message);
        }
        errorCount++;
      }
    }

    // Write dimensions to JSON file
    await mkdir(path.dirname(dimensionsFilePath), { recursive: true });
    await writeFile(dimensionsFilePath, JSON.stringify(imageDimensions, null, 2));
    console.log(`\nSuccessfully wrote data for ${Object.keys(imageDimensions).length} entries to ${dimensionsFilePath}`);


    // --- Step 2: Generate Optimized Images (Existing Logic - slightly adapted) ---
    console.log("\n--- Generating Optimized Images ---");
    await mkdir(outputDir, { recursive: true });
    const imageFilesToOptimize = await glob("**/*.{jpg,jpeg,png,gif,JPG,JPEG,PNG,GIF}", {
      cwd: sourceDir,
      nodir: true,
      absolute: true,
    });
    console.log(`Found ${imageFilesToOptimize.length} images in source directory to optimize.`);

    for (const imagePath of imageFilesToOptimize) {
        // Use the relative path from src/images for naming output files
        const relativePath = path.relative(sourceDir, imagePath).split(path.sep).join('/');
        const baseOutputDir = path.dirname(path.join(outputDir, relativePath));
        const nameWithoutExt = path.basename(relativePath, path.extname(relativePath));

        try {
            await mkdir(baseOutputDir, { recursive: true });
            const image = sharp(imagePath);
            const metadata = await image.metadata();
            const originalWidth = metadata.width;

            if (!originalWidth) {
                console.warn(`Could not get width for ${relativePath} during optimization, skipping.`);
                continue;
            }

            let generatedCount = 0;
            for (const width of targetWidths) {
                if (width <= originalWidth) {
                    const outputFilename = `${nameWithoutExt}-w${width}.webp`;
                    const outputPath = path.join(baseOutputDir, outputFilename);
                    const resizedImage = image.clone().resize({ width: width });
                    await resizedImage.webp({ quality: webpQuality }).toFile(outputPath);
                    generatedCount++;
                }
            }
            if (generatedCount > 0) {
                processedImageCount++; // Count processed source images
                // console.log(`Optimized: ${relativePath} (Generated ${generatedCount} sizes)`); // Reduce noise
            }
            // else {
            //      console.log(`Skipped optimization (all target widths larger than original): ${relativePath}`);
            // }
        } catch (err) {
            console.error(`Error optimizing ${relativePath}:`, err.message);
            errorCount++;
        }
    }


    console.log(`\nImage processing complete.`);
    console.log(`Successfully optimized images processed: ${processedImageCount}`);
    console.log(`Errors during processing: ${errorCount}`);

  } catch (err) {
    // Catch broader errors during setup (globbing, initial mkdir)
    console.error("An error occurred during image processing setup:", err);
    process.exit(1);
  }
}

optimizeAndExtractDimensions();
