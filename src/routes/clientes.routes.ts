import { Router } from "express";
import { getManager, getRepository } from "typeorm";
import Client from "../database/models/Cliente";

const clienteRoutes = Router();

clienteRoutes.post("/", async (request, response) => {
  try {
    const manager = getManager();

    const client = manager.create(Client);
    client.name = request.body.name;

    const res = await manager.save([client]);

    return response.status(201).json({ result: res });
  } catch (err) {
    console.error("Cliente router error =>", err.message);
  }
});

clienteRoutes.get("/", async (request, response) => {
  try {
    const res = await getRepository(Client).find({
      relations: ["phoneNumbers", "adresses"],
    });
    return response.status(201).json({ result: res });
  } catch (err) {
    const res = { result: err };
    return response.status(500).json(res);
  }
});

clienteRoutes.get("/:id", async (request, response) => {
  try {
    const res = await getRepository(Client).find({
      where: {
        id: request.params.id,
      },
      relations: ["phoneNumbers", "adresses"],
    });
    return response.status(201).json({ result: res });
  } catch (err) {
    const res = { result: err };
    return response.status(500).json(res);
  }
});

export default clienteRoutes;
