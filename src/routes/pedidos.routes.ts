import { Router } from "express";
import { getManager, getRepository } from "typeorm";
import { Combo } from "../database/models/Combo";
import { Order } from "../database/models/Order";
import { Products } from "../database/models/Products";

const pedidosRoutes = Router();

pedidosRoutes.get("/", async (request, response) => {
  try {
    const res = await getRepository(Order).find({
      relations: ["productsList", "comboList", "client"],
    });
    return response.status(201).json({ result: res });
  } catch (err) {
    const res = { result: err };
    return response.status(500).json(res);
  }
});

pedidosRoutes.post("/", async (request, response) => {
  // FILA = "na fila",
  // PRONTO = "pronto",
  // TRANSITO = "em transito",
  // ENTREGUE = "entregue",
  // CANCELADO = "cancelado",

  try {
    const manager = getManager();
    const {
      code,
      note,
      status,
      deliveryAddress,
      client,
      productsList,
      comboList,
    } = request.body;

    // const sumTotal = (total: number, p: Products | Combo) => {
    //   total = Number(total) + Number(p.price);
    //   return total;
    // };

    // let Total: number = 0;
    // Total = comboList ? comboList.reduce(sumTotal, 0) + Total : 0 + Total;
    // Total = comboList ? productsList.reduce(sumTotal, 0) + Total : 0 + Total;
    console.log(productsList);

    const pedido = manager.create(Order);
    // pedido.code = code;
    // pedido.note = note;
    // pedido.deliveryAddress = deliveryAddress;
    // pedido.client = client;
    // pedido.productsList = productsList;
    // pedido.total = Total;
    // pedido.status = status;

    // const res = await manager.save(pedido);

    // return response.status(201).json({ result: res });
    return response.status(201).json({ result: "ok" });
  } catch (err) {
    const res = { result: err };
    console.error("Pedido router error =>", err.message);
    return response.status(500).json(res);
  }
});

// comboRoutes.get("/:id", async (request, response) => {
//   try {
//     const res = await getRepository(Combo).find({
//       where: {
//         id: request.params.id,
//       },
//       relations: ["producs"],
//     });

//     return response.status(201).json({ result: res });
//   } catch (err) {
//     const res = { result: err };
//     return response.status(500).json(res);
//   }
// });

// comboRoutes.put("/:id", async (request, response) => {
//   try {
//     const { id } = request.params;
//     const manager = getManager();
//     const { name, price, description } = request.body;

//     const Comb = await getRepository(Combo).findOne({
//       where: {
//         id: id,
//       },
//     });

//     const res = await manager.update(Combo, id, {
//       name: name ? name : Comb.name,
//       price: price ? price : Comb.price,
//       description: description ? description : Comb.description,
//     });

//     return response.status(201).json({ result: res });
//   } catch (err) {
//     const res = { result: err };
//     console.error("Combo router error =>", err.message);
//     return response.status(500).json(res);
//   }
// });

// comboRoutes.delete(
//   "/:idCombo/produto/:idProduto",
//   async (request, response) => {
//     try {
//       const { idCombo, idProduto } = request.params;
//       const manager = getManager();

//       await manager
//         .createQueryBuilder()
//         .relation(Combo, "producs")
//         .of(idCombo)
//         .remove(idProduto);
//       const res = { result: "Combo updated!" };
//       return response.status(201).json(res);
//     } catch (err) {
//       const res = { result: err };
//       console.error("Combo router error =>", err.message);
//       return response.status(500).json(res);
//     }
//   }
// );

// comboRoutes.delete("/:idCombo/produto/", async (request, response) => {
//   try {
//     const { products } = request.body;
//     const { idCombo } = request.params;
//     const manager = getManager();

//     await manager
//       .createQueryBuilder()
//       .relation(Combo, "producs")
//       .of(idCombo)
//       .remove(products);
//     const res = { result: "Combo updated!" };
//     return response.status(201).json(res);
//   } catch (err) {
//     const res = { result: err };
//     console.error("Combo router error =>", err.message);
//     return response.status(500).json(res);
//   }
// });

// comboRoutes.delete("/:id", async (request, response) => {
//   try {
//     const { id } = request.params;
//     const manager = getManager();
//     const prods = await getRepository(Combo).find({
//       where: {
//         id: request.params.id,
//       },
//       relations: ["producs"],
//     });

//     await manager
//       .createQueryBuilder()
//       .relation(Combo, "producs")
//       .of(id)
//       .remove(prods[0].producs);

//     await manager.delete(Combo, id);

//     const res = { result: "Combo deleted!" };
//     return response.status(201).json(res);
//   } catch (err) {
//     const res = { result: err };
//     console.error("Combo router error =>", err.message);
//     return response.status(500).json(res);
//   }
// });

// comboRoutes.patch("/:idCombo/produto/:idProduto", async (request, response) => {
//   try {
//     const { idCombo, idProduto } = request.params;
//     const manager = getManager();

//     await manager
//       .createQueryBuilder()
//       .relation(Combo, "producs")
//       .of(idCombo)
//       .add(idProduto);
//     const res = { result: "Combo updated!" };
//     return response.status(201).json(res);
//   } catch (err) {
//     const res = { result: err };
//     console.error("Combo router error =>", err.message);
//     return response.status(500).json(res);
//   }
// });

// comboRoutes.patch("/:idCombo/produto", async (request, response) => {
//   try {
//     const { products } = request.body;
//     const { idCombo } = request.params;
//     const manager = getManager();

//     await manager
//       .createQueryBuilder()
//       .relation(Combo, "producs")
//       .of(idCombo)
//       .add(products);
//     const res = { result: "Combo updated!" };
//     return response.status(201).json(res);
//   } catch (err) {
//     const res = { result: err };
//     console.error("Combo router error =>", err.message);
//     return response.status(500).json(res);
//   }
// });

export default pedidosRoutes;
/*
  1 - Cadastrar um pedido(Post)
    1.1 - Cliente, Itens, valor total, endereço de entrega, status, data pedido;  
  2 - Editar pedido(Put)
    2.1 - Cliente, Itens, valor total, endereço de entrega, status, data pedido; 
  3 - Listar UM pedido(Get/id|Cliente)
  4 - Lista TODOS os pedidos(Get/ |data)
*/
