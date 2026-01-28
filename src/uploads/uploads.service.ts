import { Injectable, NotFoundException } from '@nestjs/common';
import { promises as fs } from 'fs';
import { join } from 'path';
import sharp from 'sharp';

@Injectable()
export class UploadsService {
  async optimizeImage(filePath: string): Promise<void> {
    try {
      // Read the image
      const imageBuffer = await fs.readFile(filePath);

      // Optimize and resize
      await sharp(imageBuffer)
        .resize(800, 800, {
          fit: 'inside',
          withoutEnlargement: true,
        })
        .jpeg({ quality: 80 })
        .toFile(filePath + '.optimized');

      // Replace original with optimized
      await fs.unlink(filePath);
      await fs.rename(filePath + '.optimized', filePath);
    } catch (error) {
      console.error('Image optimization failed:', error);
      // If optimization fails, keep original
    }
  }

  async createThumbnail(filePath: string): Promise<string> {
    const thumbnailPath = filePath.replace(/(\.\w+)$/, '-thumb$1');

    await sharp(filePath)
      .resize(200, 200, { fit: 'cover' })
      .jpeg({ quality: 70 })
      .toFile(thumbnailPath);

    return thumbnailPath;
  }

  async deleteFile(filePath: string): Promise<void> {
    try {
      await fs.unlink(filePath);
    } catch (error) {
      throw new NotFoundException('File not found');
    }
  }

  getFileUrl(filename: string, folder: string): string {
    return `/uploads/${folder}/${filename}`;
  }
}
