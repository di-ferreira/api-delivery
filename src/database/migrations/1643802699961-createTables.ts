import {MigrationInterface, QueryRunner} from "typeorm";

export class createTables1643802699961 implements MigrationInterface {
    name = 'createTables1643802699961'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`produto\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` varchar(255) NOT NULL, \`preco_custo\` decimal(10,2) NULL, \`descricao\` mediumtext NULL, \`estoque_minimo\` int NULL, \`estoque_maximo\` int NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`cliente\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` varchar(100) NOT NULL, \`rua\` varchar(255) NOT NULL, \`numero\` varchar(255) NOT NULL, \`bairro\` varchar(255) NOT NULL, \`cidade\` varchar(255) NOT NULL, \`uf\` char(2) NOT NULL, \`complemento\` varchar(255) NULL, \`telefone\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_94f6ee8f4dddf99c9fc0c3156b\` (\`telefone\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`pedidos\` (\`id\` int NOT NULL AUTO_INCREMENT, \`numero_pedido\` varchar(255) NOT NULL, \`total\` decimal(10,2) NOT NULL, \`observacao\` mediumtext NULL, \`status\` enum ('na fila', 'pronto', 'em transito', 'entregue', 'cancelado') NOT NULL DEFAULT 'na fila', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`cliente_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Pedido_Cardapio\` (\`id\` int NOT NULL AUTO_INCREMENT, \`quantidade\` int NOT NULL DEFAULT '1', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tipo_cardapio\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` varchar(255) NOT NULL, \`descricao\` mediumtext NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`cardapio\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` varchar(255) NOT NULL, \`preco\` decimal(10,2) NOT NULL, \`descricao\` mediumtext NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`pedidoCardapioId\` int NOT NULL, \`tipoCardapioId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`cardapio_produto_produto\` (\`cardapioId\` int NOT NULL, \`produtoId\` int NOT NULL, INDEX \`IDX_3c5295401eebbaeb5b6d5c4e8c\` (\`cardapioId\`), INDEX \`IDX_42de8be6bccfdbd4a218f79e47\` (\`produtoId\`), PRIMARY KEY (\`cardapioId\`, \`produtoId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`pedidos\` ADD CONSTRAINT \`FK_2fc639de84f845569ac2c9f78aa\` FOREIGN KEY (\`cliente_id\`) REFERENCES \`cliente\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cardapio\` ADD CONSTRAINT \`FK_a4178e4c8efeaa2f226d919acb1\` FOREIGN KEY (\`pedidoCardapioId\`) REFERENCES \`Pedido_Cardapio\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cardapio\` ADD CONSTRAINT \`FK_e48a72e1f8f2e2427914c942538\` FOREIGN KEY (\`tipoCardapioId\`) REFERENCES \`tipo_cardapio\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cardapio_produto_produto\` ADD CONSTRAINT \`FK_3c5295401eebbaeb5b6d5c4e8c1\` FOREIGN KEY (\`cardapioId\`) REFERENCES \`cardapio\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`cardapio_produto_produto\` ADD CONSTRAINT \`FK_42de8be6bccfdbd4a218f79e47b\` FOREIGN KEY (\`produtoId\`) REFERENCES \`produto\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cardapio_produto_produto\` DROP FOREIGN KEY \`FK_42de8be6bccfdbd4a218f79e47b\``);
        await queryRunner.query(`ALTER TABLE \`cardapio_produto_produto\` DROP FOREIGN KEY \`FK_3c5295401eebbaeb5b6d5c4e8c1\``);
        await queryRunner.query(`ALTER TABLE \`cardapio\` DROP FOREIGN KEY \`FK_e48a72e1f8f2e2427914c942538\``);
        await queryRunner.query(`ALTER TABLE \`cardapio\` DROP FOREIGN KEY \`FK_a4178e4c8efeaa2f226d919acb1\``);
        await queryRunner.query(`ALTER TABLE \`pedidos\` DROP FOREIGN KEY \`FK_2fc639de84f845569ac2c9f78aa\``);
        await queryRunner.query(`DROP INDEX \`IDX_42de8be6bccfdbd4a218f79e47\` ON \`cardapio_produto_produto\``);
        await queryRunner.query(`DROP INDEX \`IDX_3c5295401eebbaeb5b6d5c4e8c\` ON \`cardapio_produto_produto\``);
        await queryRunner.query(`DROP TABLE \`cardapio_produto_produto\``);
        await queryRunner.query(`DROP TABLE \`cardapio\``);
        await queryRunner.query(`DROP TABLE \`tipo_cardapio\``);
        await queryRunner.query(`DROP TABLE \`Pedido_Cardapio\``);
        await queryRunner.query(`DROP TABLE \`pedidos\``);
        await queryRunner.query(`DROP INDEX \`IDX_94f6ee8f4dddf99c9fc0c3156b\` ON \`cliente\``);
        await queryRunner.query(`DROP TABLE \`cliente\``);
        await queryRunner.query(`DROP TABLE \`produto\``);
    }

}
