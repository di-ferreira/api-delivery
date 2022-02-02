import { Router } from "express";
import { getManager, getRepository } from "typeorm";
import { TipoCardapio } from "../database/models/TipoCardapio";

const typesproductRoutes = Router();

typesproductRoutes.post("/", async (request, response) => {
  try {
    const manager = getManager();

    const { descricao, nome } = request.body;

    const tipoCardapio = manager.create(TipoCardapio);
    tipoCardapio.nome = nome;
    tipoCardapio.descricao = descricao;

    const res = await manager.save(tipoCardapio);

    return response.status(201).json({ result: res });
  } catch (err) {
    const res = { result: err.message };
    console.error("Type Product router error =>", err.message);
    return response.status(400).json(res);
  }
});

typesproductRoutes.get("/", async (request, response) => {
  try {
    const res = await getRepository(TipoCardapio).find();
    return response.status(201).json({ result: res });
  } catch (err) {
    const res = { result: err.message };
    return response.status(500).json(res);
  }
});

typesproductRoutes.get("/:id", async (request, response) => {
  try {
    const res = await getRepository(TipoCardapio).findOne(request.params.id);
    return response.status(201).json({ result: res });
  } catch (err) {
    const res = { result: err.message };
    return response.status(500).json(res);
  }
});

typesproductRoutes.put("/:id", async (request, response) => {
  try {
    const IdTipoCard = request.params.id;
    const manager = getManager();
    const { descricao, nome } = request.body;

    const tipoCardapio = await getRepository(TipoCardapio).findOne(IdTipoCard);

    const res = await manager.update(TipoCardapio, IdTipoCard, {
      nome: nome ? nome : tipoCardapio.nome,
      descricao: descricao ? descricao : tipoCardapio.descricao,
    });

    return response.status(201).json({ result: res });
  } catch (err) {
    const res = { result: err.message };
    console.error("Type Product router error =>", err.message);
    return response.status(400).json(res);
  }
});

typesproductRoutes.delete("/:id", async (request, response) => {
  try {
    const manager = getManager();
    await manager.delete(TipoCardapio, request.params.id);
    const res = { result: "Tipo Cardapio deletado!" };
    return response.status(201).json(res);
  } catch (err) {
    const res = { result: err.message };
    console.error("Type Product router error =>", err.message);
    return response.status(500).json(res);
  }
});
export default typesproductRoutes;
