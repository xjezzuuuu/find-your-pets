import { existsSync } from 'fs';
import { unlink } from 'fs/promises';
import { join } from 'path';
import { EntityRepository, Repository } from 'typeorm';

import { Image } from '../entities/image.entity';

@EntityRepository(Image)
export class ImagesRepository extends Repository<Image> {
  createRelation(petId, files: Array<Express.Multer.File>) {
    files.forEach((file) =>
      this.save({
        pets_id: petId,
        name: file.filename,
      }),
    );
  }

  async deleteInCascade(petId) {
    const images = await this.find({ pets_id: petId });

    images.forEach(async (image) => {
      const path = join(__dirname, '..', '..', '../public/images/', image.name);
      await this.softDelete(image.id);
      if (existsSync(path)) {
        await unlink(join(path));
      }
    });
  }
}
