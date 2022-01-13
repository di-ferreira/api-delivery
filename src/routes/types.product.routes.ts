import { Router } from "express";
import { getManager, getRepository } from "typeorm";
import { ProductsType } from "../database/models/ProductsType";

const typesproductRoutes = Router();

typesproductRoutes.get("/", async (request, response) => {
  try {
    const res = await getRepository(ProductsType).find();
    return response.status(201).json({ result: res });
  } catch (err) {
    const res = { result: err };
    return response.status(500).json(res);
  }
});

typesproductRoutes.post("/", async (request, response) => {
  try {
    const manager = getManager();

    const req = request.body;

    const typeProduct = manager.create(ProductsType);
    typeProduct.name = req.name;
    req.description ? (typeProduct.description = req.description) : null;

    const res = await manager.save(typeProduct);

    return response.status(201).json({ result: res });
  } catch (err) {
    const res = { result: err };
    console.error("Type Product router error =>", err.message);
    return response.status(500).json(res);
  }
});

typesproductRoutes.get("/:id", async (request, response) => {
  try {
    const res = await getRepository(ProductsType).find({
      where: {
        id: request.params.id,
      },
    });
    return response.status(201).json({ result: res });
  } catch (err) {
    const res = { result: err };
    return response.status(500).json(res);
  }
});

typesproductRoutes.put("/:id", async (request, response) => {
  try {
    const IdProdType = request.params.id;
    const manager = getManager();
    const req = request.body;

    const typeProduct = await getRepository(ProductsType).findOne({
      where: {
        id: IdProdType,
      },
    });

    const res = await manager.update(ProductsType, IdProdType, {
      name: req.name ? req.name : typeProduct.name,
      description: req.description ? req.description : typeProduct.description,
    });

    return response.status(201).json({ result: res });
  } catch (err) {
    const res = { result: err };
    console.error("Type Product router error =>", err.message);
    return response.status(500).json(res);
  }
});

typesproductRoutes.delete("/:id", async (request, response) => {
  try {
    const manager = getManager();
    await manager.delete(ProductsType, request.params.id);
    const res = { result: "Product type deleted!" };
    return response.status(201).json(res);
  } catch (err) {
    const res = { result: err };
    console.error("Type Product router error =>", err.message);
    return response.status(500).json(res);
  }
});

export default typesproductRoutes;
