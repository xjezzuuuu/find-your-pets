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
}
