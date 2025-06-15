import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const inputImage = path.join(process.cwd(), 'src', 'assets', 'logo.png');
const outputDir = path.join(process.cwd(), 'public', 'icons');

async function generateIcons() {
  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Generate icons for each size
  for (const size of sizes) {
    await sharp(inputImage)
      .resize(size, size)
      .toFile(path.join(outputDir, `icon-${size}x${size}.png`));

    console.log(`Generated ${size}x${size} icon`);
  }
}

generateIcons().catch(console.error);
