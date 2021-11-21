import { MigrationInterface, QueryRunner } from 'typeorm';

export class addImagesAndPets1637446349693 implements MigrationInterface {
  name = 'addImagesAndPets1637446349693';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`pets\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`type\` varchar(255) NOT NULL, \`race\` varchar(255) NOT NULL, \`age\` int NOT NULL, \`sex\` varchar(255) NOT NULL, \`size\` varchar(255) NOT NULL, \`story\` varchar(255) NOT NULL, \`character\` varchar(255) NOT NULL, \`social\` varchar(255) NOT NULL, \`energy\` varchar(255) NOT NULL, \`friendship\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`images\` (\`id\` int NOT NULL AUTO_INCREMENT, \`pets_id\` int NOT NULL, \`name\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`phone\` \`phone\` varchar(45) NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`password\``);
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`password\` varchar(100) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`roles\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`images\` ADD CONSTRAINT \`FK_e30d1600c90ae8718b2010c60fb\` FOREIGN KEY (\`pets_id\`) REFERENCES \`pets\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`images\` DROP FOREIGN KEY \`FK_e30d1600c90ae8718b2010c60fb\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`roles\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`password\``);
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`password\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`phone\` \`phone\` varchar(45) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(`DROP TABLE \`images\``);
    await queryRunner.query(`DROP TABLE \`pets\``);
  }
}
