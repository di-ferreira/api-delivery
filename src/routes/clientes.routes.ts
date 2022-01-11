import { Router } from "express";
import { getRepository } from "typeorm";
import Addresses from "../database/models/Addresses";
import Client from "../database/models/Client";
import PhoneNumbers from "../database/models/PhoneNumbers";

const clienteRoutes = Router();

clienteRoutes.post("/", async (request, response) => {
  try {
    const repo = getRepository(Client);

    const client = new Client();
    client.name = request.body.name;
    await repo.manager.save(client);

    const phones = new PhoneNumbers();
    phones.client = client;

    const addresses = new Addresses();

    const res = await repo.save(request.body);
    return response.status(201).json(res);
  } catch (err) {
    console.error("Cliente router error", err.message);
  }
});

clienteRoutes.get("/", async (request, response) => {
  const res = await getRepository(Client).find();
  response.json(res);
});

clienteRoutes.get("/:name", async (request, response) => {
  const res = await getRepository(Client).find({
    where: {
      name: request.params.name,
    },
  });
  response.json(res);
});

export default clienteRoutes;
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
