import {MigrationInterface, QueryRunner} from "typeorm";

export class tables1642620694166 implements MigrationInterface {
    name = 'tables1642620694166'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`products_type\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` mediumtext NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`products\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`price\` decimal(10,2) NOT NULL, \`description\` mediumtext NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`productTypeId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product_list_order\` (\`id\` int NOT NULL AUTO_INCREMENT, \`quantity\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`order\` (\`id\` int NOT NULL AUTO_INCREMENT, \`code\` varchar(255) NOT NULL, \`total\` decimal(10,2) NOT NULL, \`note\` mediumtext NULL, \`status\` enum ('na fila', 'pronto', 'em transito', 'entregue', 'cancelado') NOT NULL DEFAULT 'na fila', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`addressId\` int NOT NULL, \`clientId\` int NOT NULL, UNIQUE INDEX \`REL_73f9a47e41912876446d047d01\` (\`addressId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`phone_numbers\` (\`id\` int NOT NULL AUTO_INCREMENT, \`phone_number\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`clientId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`client\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`addresses\` (\`id\` int NOT NULL AUTO_INCREMENT, \`street\` varchar(255) NOT NULL, \`number\` varchar(255) NOT NULL, \`district\` varchar(255) NOT NULL, \`city\` varchar(255) NULL, \`complement\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`clientId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`combo\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`price\` decimal(10,2) NOT NULL, \`description\` mediumtext NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product_list_order_producs_products\` (\`productListOrderId\` int NOT NULL, \`productsId\` int NOT NULL, INDEX \`IDX_65e39d9b5fddfaa3d21f381d20\` (\`productListOrderId\`), INDEX \`IDX_aaa0a330683d95ccd0224990c6\` (\`productsId\`), PRIMARY KEY (\`productListOrderId\`, \`productsId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`combo_producs_products\` (\`comboId\` int NOT NULL, \`productsId\` int NOT NULL, INDEX \`IDX_e1394bc61fb2e052c4e586694e\` (\`comboId\`), INDEX \`IDX_5a9a811ff6e864846b77403f5f\` (\`productsId\`), PRIMARY KEY (\`comboId\`, \`productsId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD CONSTRAINT \`FK_fed065ae1a8b80a37a9230da1fa\` FOREIGN KEY (\`productTypeId\`) REFERENCES \`products_type\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_73f9a47e41912876446d047d015\` FOREIGN KEY (\`addressId\`) REFERENCES \`addresses\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_9b27855a9c2ade186e5c55d1ec3\` FOREIGN KEY (\`clientId\`) REFERENCES \`client\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`phone_numbers\` ADD CONSTRAINT \`FK_9d2a9fd13f26be821580c548209\` FOREIGN KEY (\`clientId\`) REFERENCES \`client\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`addresses\` ADD CONSTRAINT \`FK_ae1b6a2290ac79ac41dff9aa574\` FOREIGN KEY (\`clientId\`) REFERENCES \`client\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_list_order_producs_products\` ADD CONSTRAINT \`FK_65e39d9b5fddfaa3d21f381d205\` FOREIGN KEY (\`productListOrderId\`) REFERENCES \`product_list_order\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`product_list_order_producs_products\` ADD CONSTRAINT \`FK_aaa0a330683d95ccd0224990c66\` FOREIGN KEY (\`productsId\`) REFERENCES \`products\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`combo_producs_products\` ADD CONSTRAINT \`FK_e1394bc61fb2e052c4e586694e5\` FOREIGN KEY (\`comboId\`) REFERENCES \`combo\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`combo_producs_products\` ADD CONSTRAINT \`FK_5a9a811ff6e864846b77403f5f7\` FOREIGN KEY (\`productsId\`) REFERENCES \`products\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`combo_producs_products\` DROP FOREIGN KEY \`FK_5a9a811ff6e864846b77403f5f7\``);
        await queryRunner.query(`ALTER TABLE \`combo_producs_products\` DROP FOREIGN KEY \`FK_e1394bc61fb2e052c4e586694e5\``);
        await queryRunner.query(`ALTER TABLE \`product_list_order_producs_products\` DROP FOREIGN KEY \`FK_aaa0a330683d95ccd0224990c66\``);
        await queryRunner.query(`ALTER TABLE \`product_list_order_producs_products\` DROP FOREIGN KEY \`FK_65e39d9b5fddfaa3d21f381d205\``);
        await queryRunner.query(`ALTER TABLE \`addresses\` DROP FOREIGN KEY \`FK_ae1b6a2290ac79ac41dff9aa574\``);
        await queryRunner.query(`ALTER TABLE \`phone_numbers\` DROP FOREIGN KEY \`FK_9d2a9fd13f26be821580c548209\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_9b27855a9c2ade186e5c55d1ec3\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_73f9a47e41912876446d047d015\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_fed065ae1a8b80a37a9230da1fa\``);
        await queryRunner.query(`DROP INDEX \`IDX_5a9a811ff6e864846b77403f5f\` ON \`combo_producs_products\``);
        await queryRunner.query(`DROP INDEX \`IDX_e1394bc61fb2e052c4e586694e\` ON \`combo_producs_products\``);
        await queryRunner.query(`DROP TABLE \`combo_producs_products\``);
        await queryRunner.query(`DROP INDEX \`IDX_aaa0a330683d95ccd0224990c6\` ON \`product_list_order_producs_products\``);
        await queryRunner.query(`DROP INDEX \`IDX_65e39d9b5fddfaa3d21f381d20\` ON \`product_list_order_producs_products\``);
        await queryRunner.query(`DROP TABLE \`product_list_order_producs_products\``);
        await queryRunner.query(`DROP TABLE \`combo\``);
        await queryRunner.query(`DROP TABLE \`addresses\``);
        await queryRunner.query(`DROP TABLE \`client\``);
        await queryRunner.query(`DROP TABLE \`phone_numbers\``);
        await queryRunner.query(`DROP INDEX \`REL_73f9a47e41912876446d047d01\` ON \`order\``);
        await queryRunner.query(`DROP TABLE \`order\``);
        await queryRunner.query(`DROP TABLE \`product_list_order\``);
        await queryRunner.query(`DROP TABLE \`products\``);
        await queryRunner.query(`DROP TABLE \`products_type\``);
    }

}
