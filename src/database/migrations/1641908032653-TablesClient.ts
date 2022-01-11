import {MigrationInterface, QueryRunner} from "typeorm";

export class TablesClient1641908032653 implements MigrationInterface {
    name = 'TablesClient1641908032653'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`addresses\` (\`id\` int NOT NULL AUTO_INCREMENT, \`street\` varchar(255) NOT NULL, \`number\` varchar(255) NOT NULL, \`district\` varchar(255) NOT NULL, \`city\` varchar(255) NOT NULL, \`complement\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`client\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`phone_numbers\` (\`id\` int NOT NULL AUTO_INCREMENT, \`phone_number\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`phone_numbers\``);
        await queryRunner.query(`DROP TABLE \`client\``);
        await queryRunner.query(`DROP TABLE \`addresses\``);
    }

}
