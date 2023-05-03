import { Router } from 'express';
import typesproductRoutes from './tipo.cardapio.routes';

const productsRoutes = Router();

// productsRoutes.use("/tipos", typesproductRoutes);

// productsRoutes.post("/", async (request, response) => {
//   try {
//     const manager = getManager();

//     const { nome, precoCusto, descricao, estoqueMin, estoqueMax } =
//       request.body;

//     const produto = manager.create(Produto);
//     produto.nome = nome;
//     produto.precoCusto = precoCusto;
//     produto.descricao = descricao;
//     produto.estoqueMin = estoqueMin;
//     produto.estoqueMax = estoqueMax;

//     const res = await manager.save(produto);

//     return response.status(201).json({ result: res });
//   } catch (err) {
//     const res = { result: err.message };
//     console.error("Produto router error =>", err.message);
//     return response.status(400).json(res);
//   }
// });

// productsRoutes.get("/", async (request, response) => {
//   try {
//     const res = await getRepository(Produto).find();
//     return response.status(201).json({ result: res });
//   } catch (err) {
//     const res = { result: err.message };
//     return response.status(500).json(res);
//   }
// });

// productsRoutes.get("/:id", async (request, response) => {
//   try {
//     const res = await getRepository(Produto).findOne(request.params.id);
//     return response.status(201).json({ result: res });
//   } catch (err) {
//     const res = { result: err.message };
//     return response.status(500).json(res);
//   }
// });

// productsRoutes.put("/:id", async (request, response) => {
//   try {
//     const IdProd = request.params.id;
//     const manager = getManager();
//     const { nome, precoCusto, descricao, estoqueMin, estoqueMax } =
//       request.body;

//     const Prod = await getRepository(Produto).findOne(IdProd);

//     const res = await manager.update(Produto, IdProd, {
//       nome: nome ? nome : Prod.nome,
//       precoCusto: precoCusto ? precoCusto : Prod.precoCusto,
//       descricao: descricao ? descricao : Prod.descricao,
//       estoqueMin: estoqueMin ? estoqueMin : Prod.estoqueMin,
//       estoqueMax: estoqueMax ? estoqueMax : Prod.estoqueMax,
//     });

//     return response.status(201).json({ result: res });
//   } catch (err) {
//     const res = { result: err };
//     console.error("Produto router error =>", err.message);
//     return response.status(500).json(res);
//   }
// });

// productsRoutes.delete("/:id", async (request, response) => {
//   try {
//     const manager = getManager();
//     await manager.delete(Produto, request.params.id);
//     const res = { result: "Produto deletado!" };
//     return response.status(201).json(res);
//   } catch (err) {
//     const res = { result: err.message };
//     console.error("Produto router error =>", err.message);
//     return response.status(500).json(res);
//   }
// });

export default productsRoutes;
