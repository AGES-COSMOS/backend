import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import * as path from 'path';
import * as sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class SharpPipe
  implements PipeTransform<Express.Multer.File, Promise<string>>
{
  async transform(image: Express.Multer.File): Promise<string> {
    if (!image) {
      return null;
    }
    if (!image.mimetype.startsWith('image')) {
      throw new BadRequestException(['invalid image type']);
    }
    const uuid = uuidv4();
    const filename = uuid + '.webp';

    await sharp(image.buffer)
      .resize({
        width: 1200,
        height: 800,
        fit: sharp.fit.contain,
        background: { r: 255, g: 255, b: 255, alpha: 0 },
      })
      .webp({ effort: 3 })
      .toFile(path.join('public', filename));

    return filename;
  }
}
