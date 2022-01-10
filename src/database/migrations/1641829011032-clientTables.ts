import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class ClientTables1641829011032 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "client",
        columns: [
          {
            name: "id",
            type: "int",
            generationStrategy: "increment",
            isGenerated: true,
            isPrimary: true,
            isNullable: false,
          },
          {
            name: "name",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable("client");
  }
}
/*
  1 - Cadastrar um cliente(Post)
    1.1 - Nome, contato,endereço;
    1.2 - contato tabela separada pois cliente pode ter mais de um contato; 
    1.3 - Endereço tabela separada pois cliente pode ter mais de um Endereço de entrega; 
  2 - Editar cliente(Put)
    2.1 - Nome, contato,endereço;
  3 - Listar UM cliente(Get/id|nome)
  4 - Lista TODOS os itens(Get/)
*/
