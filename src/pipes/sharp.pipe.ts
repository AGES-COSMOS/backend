import { Injectable, PipeTransform } from '@nestjs/common';
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

    /*const fileType: FileTypeResult = await fileTypeFromBuffer(image.buffer);

    if (!fileType || !fileType.mime.startsWith('image/')) {
      throw new BadRequestException(
        'O arquivo enviado deve ser uma imagem válida.',
      );
    }*/

    const uuid = uuidv4();
    const filename = uuid + '.webp';

    await sharp(image.buffer)
      .resize(800)
      .webp({ effort: 3 })
      .toFile(path.join('uploads', filename));

    return filename;
  }
}
