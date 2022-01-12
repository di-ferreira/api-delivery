import { Router } from "express";
import { getManager, getRepository } from "typeorm";
import { Products } from "../database/models/Products";

const productsRoutes = Router();

productsRoutes.get("/", async (request, response) => {
  const res = await getRepository(Products).find();
  response.json(res);
});

productsRoutes.post("/", async (request, response) => {
  try {
    const manager = getManager();

    const product = manager.create(Products);
    product.name = request.body.name;
    product.price = request.body.price;
    request.body.description
      ? (product.description = request.body.description)
      : null;

    const res = await manager.save(product);

    return response.status(201).json(res);
  } catch (err) {
    console.error("Produto router error =>", err.message);
  }
});

productsRoutes.get("/:id", async (request, response) => {
  const res = await getRepository(Products).find({
    where: {
      id: request.params.id,
    },
  });
  response.json(res);
});

productsRoutes.put("/:id", async (request, response) => {
  response.send("Rota de cardapio");
});

productsRoutes.delete("/:id", async (request, response) => {
  response.send("Rota de cardapio");
});

export default productsRoutes;
/*
  1 - Cadastrar um item(Post)
    1.1 - Nome, valor, descrição;  
  2 - Editar item(Put)
    2.1 - Nome, valor, descrição;
  3 - Listar UM item(Get/id|nome)
  4 - Lista TODOS os itens(Get/)
*/
