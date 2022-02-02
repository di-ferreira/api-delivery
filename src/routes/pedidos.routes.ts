import { Router } from "express";
import { getManager, getRepository } from "typeorm";

const pedidosRoutes = Router();
/*
pedidosRoutes.get("/", async (request, response) => {
  try {
    const manager = getManager();
    // const order = await getRepository(Order).find({
    //   relations: ["productsList"],
    // });
    const products = await manager
      .createQueryBuilder(ProductListOrder, "prodlistorder")
      .leftJoinAndSelect("prodlistorder.order", "order")
      .leftJoinAndSelect("prodlistorder.producs", "producs")
      .getMany();

    const order = await manager
      .createQueryBuilder(Order, "order")
      .leftJoinAndSelect("order.productsList", "productsList")
      .getMany();

    // return response.status(201).json({ result: "ok" });
    return response.status(201).json({ result: products });
  } catch (err) {
    const res = { result: err };
    console.log("Error Pedidos Get =>", err);
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
    const { client, code, deliveryAddress, note, productsList, status } =
      request.body;

    const sumTotal = (total: number, p: ProductListOrder) => {
      total = Number(total) + Number(p.producs[0].price) * Number(p.quantity);
      return total;
    };

    let Total: number = 0;
    Total = productsList ? productsList.reduce(sumTotal, 0) + Total : 0 + Total;

    productsList.forEach((p: ProductListOrder) => {
      console.log(
        `${p.producs[0].name}`,
        Number(p.producs[0].price) * Number(p.quantity)
      );
    });

    let listProd = [];

    productsList.forEach(async (prod: ProductListOrder, index) => {
      const prodList = manager.create(ProductListOrder);
      prodList.quantity = prod.quantity;
      prodList.producs = prod.producs;
      // prodList.order = pedido;
      await manager.save(prodList);
      listProd.push(prodList);
    });

    const pedido = manager.create(Order);
    pedido.client = client;
    pedido.code = code;
    pedido.deliveryAddress = deliveryAddress;
    pedido.note = note;
    pedido.status = status;
    pedido.productsList = listProd;
    pedido.total = Total;

    const res = await manager.save(pedido);

    return response.status(201).json({ result: res });
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
*/
export default pedidosRoutes;
/*
  1 - Cadastrar um pedido(Post)
    1.1 - Cliente, Itens, valor total, endereço de entrega, status, data pedido;  
  2 - Editar pedido(Put)
    2.1 - Cliente, Itens, valor total, endereço de entrega, status, data pedido; 
  3 - Listar UM pedido(Get/id|Cliente)
  4 - Lista TODOS os pedidos(Get/ |data)
*/
