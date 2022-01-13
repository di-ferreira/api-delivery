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

    return response.status(201).json({ result: res });
  } catch (err) {
    console.error("Cliente router error =>", err.message);
  }
});

clienteRoutes.get("/", async (request, response) => {
  try {
    const res = await getRepository(Client).find();
    return response.status(201).json({ result: res });
  } catch (err) {
    const res = { result: err };
    return response.status(500).json(res);
  }
});

clienteRoutes.get("/:name", async (request, response) => {
  try {
    const res = await getRepository(Client).find({
      where: {
        name: request.params.name,
      },
    });
    return response.status(201).json({ result: res });
  } catch (err) {
    const res = { result: err };
    return response.status(500).json(res);
  }
});

export default clienteRoutes;
