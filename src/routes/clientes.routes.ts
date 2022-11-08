import { Router } from "express";
import { getManager, getRepository } from "typeorm";
import { Cliente } from "../database/models/Cliente";

const clienteRoutes = Router();

clienteRoutes.post("/", async (request, response) => {
  try {
    const { nome, rua, numero, bairro, cidade, uf, complemento, telefone } =
      request.body;
    const manager = getManager();

    const cliente = manager.create(Cliente);
    cliente.nome = nome;
    // cliente.rua = rua;
    // cliente.numero = numero;
    // cliente.bairro = bairro;
    // cliente.cidade = cidade;
    // cliente.uf = uf;
    // cliente.complemento = complemento;
    // complemento ? (cliente.complemento = complemento) : null;
    cliente.telefone = telefone;

    const res = await manager.save(cliente);

    return response.status(201).json({ result: res });
  } catch (err) {
    console.error("Cliente router error =>", err.message);
    return response.status(400).json({ error: err.message });
  }
});

clienteRoutes.get("/", async (request, response) => {
  try {
    const res = await getRepository(Cliente).find();
    return response.status(201).json({ result: res });
  } catch (err) {
    const res = { result: err };
    return response.status(500).json(res);
  }
});

clienteRoutes.get("/:id", async (request, response) => {
  try {
    const res = await getRepository(Cliente).findOne(request.params.id);
    return response.status(201).json({ result: res });
  } catch (err) {
    const res = { result: err.message };
    return response.status(400).json(res);
  }
});

export default clienteRoutes;
