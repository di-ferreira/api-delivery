import { Router } from "express";
import { getManager, getRepository } from "typeorm";
import Addresses from "../database/models/Addresses";
import Client from "../database/models/Client";
import PhoneNumbers from "../database/models/PhoneNumbers";

const clienteRoutes = Router();

clienteRoutes.post("/", async (request, response) => {
  try {
    const manager = getManager();

    const client = manager.create(Client);
    client.name = request.body.name;

    const phones = manager.create(PhoneNumbers);
    phones.client = client;
    phones.phoneNumber = request.body.phone;

    const addresses = manager.create(Addresses);
    addresses.client = client;
    addresses.street = request.body.street;
    addresses.district = request.body.district;
    addresses.number = request.body.number;
    addresses.complement = request.body.complement;
    addresses.city = request.body.city;

    const res = await manager.save([client, phones, addresses]);

    return response.status(201).json(res);
  } catch (err) {
    console.error("Cliente router error =>", err.message);
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
