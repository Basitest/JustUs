import { mkdir } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import sharp from "sharp";

const root = process.cwd();
const scenesDir = path.join(root, "public", "images", "scenes");

const images = [
  ["hero.png", "hero.webp"],
  ["college-event.png", "college-event.webp"],
  ["Aru in his room at night.png", "message-reason.webp"],
  ["Looking at presentation together.png", "conversations.webp"],
  ["Tea shop after exam.png", "missed-ride.webp"],
  ["Scooter ride.png", "scooter-ride.webp"],
  ["Hill at sunset.png", "hill.webp"],
  ["Bhaktapur evening.png", "bhaktapur.webp"],
];

await mkdir(scenesDir, { recursive: true });

for (const [sourceName, outputName] of images) {
  const input = path.join(root, "my-images", sourceName);
  const output = path.join(scenesDir, outputName);

  await sharp(input).webp({ quality: 88 }).toFile(output);

  const metadata = await sharp(output).metadata();
  if (metadata.format !== "webp" || !metadata.width || !metadata.height) {
    throw new Error(`Invalid WebP output: ${outputName}`);
  }

  console.log(
    `${sourceName} -> public/images/scenes/${outputName} (${metadata.width}x${metadata.height})`,
  );
}
