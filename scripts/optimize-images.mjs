import sharp from "sharp";
import { glob } from "glob";
import { mkdir, stat } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// --- Configuration ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, ".."); // Assumes script is in 'scripts' dir

const sourceDir = path.join(projectRoot, "src", "images");
const outputDir = path.join(projectRoot, "public", "optimized-images");
const targetWidths = [400, 800, 1200, 1920]; // Define target widths for srcset
const webpQuality = 80; // Quality for WebP conversion
// --- End Configuration ---

async function optimizeImages() {
  console.log(`Starting image optimization...`);
  console.log(`Source directory: ${sourceDir}`);
  console.log(`Output directory: ${outputDir}`);

  try {
    // Ensure output directory exists
    await mkdir(outputDir, { recursive: true });
    console.log(`Ensured output directory exists: ${outputDir}`);

    // Find all image files in the source directory
    const imagePaths = await glob("**/*.{jpg,jpeg,png,gif,JPG,JPEG,PNG,GIF}", {
      cwd: sourceDir,
      nodir: true, // Exclude directories
      absolute: true, // Get absolute paths
    });

    console.log(`Found ${imagePaths.length} images to process.`);

    let processedCount = 0;
    let errorCount = 0;

    // Process each image
    for (const imagePath of imagePaths) {
      const relativePath = path.relative(sourceDir, imagePath);
      const baseOutputDir = path.dirname(path.join(outputDir, relativePath));
      const nameWithoutExt = path.basename(
        relativePath,
        path.extname(relativePath),
      );

      try {
        // Ensure subdirectory exists in the output path
        await mkdir(baseOutputDir, { recursive: true });

        const image = sharp(imagePath);
        const metadata = await image.metadata();
        const originalWidth = metadata.width;

        if (!originalWidth) {
          console.warn(`Could not get width for ${relativePath}, skipping.`);
          continue;
        }

        let generatedCount = 0;
        // Generate different sizes
        for (const width of targetWidths) {
          // Only generate if target width is smaller or equal to original
          // and avoid upscaling
          if (width <= originalWidth) {
            const outputFilename = `${nameWithoutExt}-w${width}.webp`;
            const outputPath = path.join(baseOutputDir, outputFilename);

            // Clone the sharp object for each resize operation
            const resizedImage = image.clone().resize({ width: width });
            await resizedImage
              .webp({ quality: webpQuality })
              .toFile(outputPath);

            console.log(
              `Generated: ${relativePath} -> ${path.relative(projectRoot, outputPath)}`,
            );
            generatedCount++;
          }
        }
        if (generatedCount > 0) {
          processedCount++; // Count the original image as processed if at least one size was generated
        } else {
          console.log(
            `Skipped (all target widths larger than original): ${relativePath}`,
          );
        }
      } catch (err) {
        console.error(`Error processing ${relativePath}:`, err);
        errorCount++;
      }
    }

    console.log(`\nImage optimization complete.`);
    console.log(`Successfully processed: ${processedCount}`);
    console.log(`Errors: ${errorCount}`);
  } catch (err) {
    console.error("An error occurred during image optimization setup:", err);
    process.exit(1); // Exit with error code
  }
}

optimizeImages();
