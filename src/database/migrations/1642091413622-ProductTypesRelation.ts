import {MigrationInterface, QueryRunner} from "typeorm";

export class ProductTypesRelation1642091413622 implements MigrationInterface {
    name = 'ProductTypesRelation1642091413622'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`products_type\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` mediumtext NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`productTypeId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`addresses\` CHANGE \`city\` \`city\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`addresses\` CHANGE \`complement\` \`complement\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`description\` \`description\` mediumtext NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD CONSTRAINT \`FK_fed065ae1a8b80a37a9230da1fa\` FOREIGN KEY (\`productTypeId\`) REFERENCES \`products_type\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_fed065ae1a8b80a37a9230da1fa\``);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`description\` \`description\` mediumtext NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`addresses\` CHANGE \`complement\` \`complement\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`addresses\` CHANGE \`city\` \`city\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`productTypeId\``);
        await queryRunner.query(`DROP TABLE \`products_type\``);
    }

}
