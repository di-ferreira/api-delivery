import { Router } from "express";
import { getManager, getRepository } from "typeorm";
import { Combo } from "../database/models/Combo";

const comboRoutes = Router();

comboRoutes.get("/", async (request, response) => {
  try {
    const res = await getRepository(Combo).find({ relations: ["producs"] });
    return response.status(201).json({ result: res });
  } catch (err) {
    const res = { result: err };
    return response.status(500).json(res);
  }
});

comboRoutes.post("/", async (request, response) => {
  try {
    const manager = getManager();

    const { name, price, description, producs } = request.body;

    const combo = manager.create(Combo);
    combo.name = name;
    combo.price = price;
    description ? (combo.description = description) : null;
    combo.producs = producs;

    const res = await manager.save(combo);

    return response.status(201).json({ result: res });
  } catch (err) {
    const res = { result: err };
    return response.status(500).json(res);
    console.error("Combo router error =>", err.message);
  }
});

comboRoutes.get("/:id", async (request, response) => {
  try {
    const res = await getRepository(Combo).find({
      where: {
        id: request.params.id,
      },
      relations: ["producs"],
    });

    return response.status(201).json({ result: res });
  } catch (err) {
    const res = { result: err };
    return response.status(500).json(res);
  }
});

// comboRoutes.put("/:id", async (request, response) => {
//   try {
//     const { id } = request.params;
//     const manager = getManager();
//     // const { name, price, description, producs } = request.body;
//     const req = request.body;

//     const Comb = await getRepository(Combo).findOne({
//       where: {
//         id: id,
//       },
//     });

//     const res = await manager.update(Combo, id, {
//       name: req.name ? req.name : Comb.name,
//       price: req.price ? req.price : Comb.price,
//       description: req.description ? req.description : Comb.description,
//       producs: req.producs ? req.producs : Comb.producs,
//     });

//     return response.status(201).json({ result: res });
//   } catch (err) {
//     const res = { result: err };
//     console.error("Combo router error =>", err.message);
//     return response.status(500).json(res);
//   }
// });

// comboRoutes.delete("/:id", async (request, response) => {
//   try {
//     const manager = getManager();
//     await manager.delete(Combo, request.params.id);
//     const res = { result: "Combo deleted!" };
//     return response.status(201).json(res);
//   } catch (err) {
//     const res = { result: err };
//     console.error("Combo router error =>", err.message);
//     return response.status(500).json(res);
//   }
// });

comboRoutes.delete(
  "/:idCombo/produto/:idProduto",
  async (request, response) => {
    try {
      const { idCombo, idProduto } = request.params;
      const manager = getManager();

      await manager
        .createQueryBuilder()
        .relation(Combo, "producs")
        .of(idCombo)
        .remove(idProduto);
      const res = { result: "Combo updated!" };
      return response.status(201).json(res);
    } catch (err) {
      const res = { result: err };
      console.error("Combo router error =>", err.message);
      return response.status(500).json(res);
    }
  }
);

comboRoutes.delete("/:idCombo/produto/", async (request, response) => {
  try {
    const { products } = request.body;
    const { idCombo } = request.params;
    const manager = getManager();

    await manager
      .createQueryBuilder()
      .relation(Combo, "producs")
      .of(idCombo)
      .remove(products);
    const res = { result: "Combo updated!" };
    return response.status(201).json(res);
  } catch (err) {
    const res = { result: err };
    console.error("Combo router error =>", err.message);
    return response.status(500).json(res);
  }
});

comboRoutes.patch("/:idCombo/produto/:idProduto", async (request, response) => {
  try {
    const { idCombo, idProduto } = request.params;
    const manager = getManager();

    await manager
      .createQueryBuilder()
      .relation(Combo, "producs")
      .of(idCombo)
      .add(idProduto);
    const res = { result: "Combo updated!" };
    return response.status(201).json(res);
  } catch (err) {
    const res = { result: err };
    console.error("Combo router error =>", err.message);
    return response.status(500).json(res);
  }
});

comboRoutes.patch("/:idCombo/produto", async (request, response) => {
  try {
    const { products } = request.body;
    const { idCombo } = request.params;
    const manager = getManager();

    await manager
      .createQueryBuilder()
      .relation(Combo, "producs")
      .of(idCombo)
      .add(products);
    const res = { result: "Combo updated!" };
    return response.status(201).json(res);
  } catch (err) {
    const res = { result: err };
    console.error("Combo router error =>", err.message);
    return response.status(500).json(res);
  }
});

export default comboRoutes;
/*
  1 - Cadastrar um item(Post)
    1.1 - Nome, valor, descrição;  
  2 - Editar item(Put)
    2.1 - Nome, valor, descrição;
  3 - Listar UM item(Get/id|nome)
  4 - Lista TODOS os itens(Get/)
*/
