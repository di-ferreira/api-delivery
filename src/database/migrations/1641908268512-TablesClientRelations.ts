import {MigrationInterface, QueryRunner} from "typeorm";

export class TablesClientRelations1641908268512 implements MigrationInterface {
    name = 'TablesClientRelations1641908268512'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`phone_numbers\` ADD \`clientId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`addresses\` ADD \`clientId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`phone_numbers\` ADD CONSTRAINT \`FK_9d2a9fd13f26be821580c548209\` FOREIGN KEY (\`clientId\`) REFERENCES \`client\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`addresses\` ADD CONSTRAINT \`FK_ae1b6a2290ac79ac41dff9aa574\` FOREIGN KEY (\`clientId\`) REFERENCES \`client\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`addresses\` DROP FOREIGN KEY \`FK_ae1b6a2290ac79ac41dff9aa574\``);
        await queryRunner.query(`ALTER TABLE \`phone_numbers\` DROP FOREIGN KEY \`FK_9d2a9fd13f26be821580c548209\``);
        await queryRunner.query(`ALTER TABLE \`addresses\` DROP COLUMN \`clientId\``);
        await queryRunner.query(`ALTER TABLE \`phone_numbers\` DROP COLUMN \`clientId\``);
    }

}
