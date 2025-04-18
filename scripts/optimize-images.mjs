import sharp from 'sharp';
import { glob } from 'glob';
import { mkdir, stat } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// --- Configuration ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..'); // Assumes script is in 'scripts' dir

const sourceDir = path.join(projectRoot, 'src', 'images');
const outputDir = path.join(projectRoot, 'public', 'optimized-images');
const maxWidth = 1920; // Max width for images
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
    const imagePaths = await glob('**/*.{jpg,jpeg,png,gif,JPG,JPEG,PNG,GIF}', {
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
      const outputPathWithoutExt = path.join(outputDir, relativePath.substring(0, relativePath.lastIndexOf('.')));
      const outputWebpPath = `${outputPathWithoutExt}.webp`;
      const outputDirForFile = path.dirname(outputWebpPath);

      try {
        // Ensure subdirectory exists in the output path
        await mkdir(outputDirForFile, { recursive: true });

        const image = sharp(imagePath);
        const metadata = await image.metadata();

        // Resize if wider than maxWidth
        if (metadata.width && metadata.width > maxWidth) {
          image.resize({ width: maxWidth });
        }

        // Convert to WebP and save
        await image
          .webp({ quality: webpQuality })
          .toFile(outputWebpPath);

        console.log(`Optimized: ${relativePath} -> ${path.relative(projectRoot, outputWebpPath)}`);
        processedCount++;

      } catch (err) {
        console.error(`Error processing ${relativePath}:`, err);
        errorCount++;
      }
    }

    console.log(`\nImage optimization complete.`);
    console.log(`Successfully processed: ${processedCount}`);
    console.log(`Errors: ${errorCount}`);

  } catch (err) {
    console.error('An error occurred during image optimization setup:', err);
    process.exit(1); // Exit with error code
  }
}

optimizeImages();
