import { copyFile, mkdir } from 'fs/promises';
import { join } from 'path';

async function copyImages() {
  const publicDir = 'public';
  const projectsDir = join(publicDir, 'projects');

  // Create projects directory if it doesn't exist
  try {
    await mkdir(projectsDir, { recursive: true });
    console.log('Created projects directory');
  } catch (error) {
    console.log('Projects directory already exists');
  }

  // Copy images
  const imagesToCopy = [
    { from: join(publicDir, '10.jpg'), to: join(projectsDir, 'bedroom-1.jpg') },
    { from: join(publicDir, '2.jpg'), to: join(projectsDir, 'modern-1.jpg') },
    { from: join(publicDir, '3.jpg'), to: join(projectsDir, 'classic-1.jpg') },
    { from: join(publicDir, '4.jpg'), to: join(projectsDir, 'aluminum-1.jpg') },
  ];

  for (const { from, to } of imagesToCopy) {
    try {
      await copyFile(from, to);
      console.log(`✓ Copied ${from} → ${to}`);
    } catch (error) {
      console.error(`✗ Failed to copy ${from}:`, error.message);
    }
  }

  console.log('\nAll images copied successfully!');
}

copyImages();
