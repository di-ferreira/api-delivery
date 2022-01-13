import { Router } from "express";
import { getManager, getRepository } from "typeorm";
import { Products } from "../database/models/Products";

const productsRoutes = Router();

productsRoutes.get("/", async (request, response) => {
  try {
    const res = await getRepository(Products).find();
    return response.status(201).json(res);
  } catch (err) {
    const res = { result: err };
    return response.status(500).json(res);
  }
});

productsRoutes.post("/", async (request, response) => {
  try {
    const manager = getManager();

    const req = request.body;

    const product = manager.create(Products);
    product.name = req.name;
    product.price = req.price;
    req.description ? (product.description = req.description) : null;

    const res = await manager.save(product);

    return response.status(201).json(res);
  } catch (err) {
    const res = { result: err };
    return response.status(500).json(res);
    console.error("Produto router error =>", err.message);
  }
});

productsRoutes.get("/:id", async (request, response) => {
  try {
    const res = await getRepository(Products).find({
      where: {
        id: request.params.id,
      },
    });
    return response.status(201).json(res);
  } catch (err) {
    const res = { result: err };
    return response.status(500).json(res);
  }
});

productsRoutes.put("/:id", async (request, response) => {
  try {
    const IdProd = request.params.id;
    const manager = getManager();
    const req = request.body;

    const Prod = await getRepository(Products).findOne({
      where: {
        id: IdProd,
      },
    });

    const res = await manager.update(Products, IdProd, {
      name: req.name ? req.name : Prod.name,
      price: req.price ? req.price : Prod.price,
      description: req.description ? req.description : Prod.description,
    });

    return response.status(201).json(res);
  } catch (err) {
    const res = { result: err };
    return response.status(500).json(res);
    console.error("Produto router error =>", err.message);
  }
});

productsRoutes.delete("/:id", async (request, response) => {
  try {
    const manager = getManager();
    await manager.delete(Products, request.params.id);
    const res = { result: "Product deleted!" };
    return response.status(201).json(res);
  } catch (err) {
    const res = { result: err };
    return response.status(500).json(res);
    console.error("Produto router error =>", err.message);
  }
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
