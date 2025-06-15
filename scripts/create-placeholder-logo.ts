import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const size = 512;
const text = 'GTA';

// Create a placeholder logo
sharp({
  create: {
    width: size,
    height: size,
    channels: 4,
    background: { r: 0, g: 0, b: 255, alpha: 1 }
  }
})
.composite([{
  input: Buffer.from(`<svg><text x="50%" y="50%" font-family="Arial" font-size="120" fill="white" text-anchor="middle" dy=".3em">${text}</text></svg>`),
  top: 0,
  left: 0
}])
.png()
.toFile(path.join(__dirname, '../src/assets/logo.png'));
