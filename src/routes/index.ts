import { Router } from "express";
import { getManager } from "typeorm";

import productsRoutes from "./produtos.routes";
import clienteRoutes from "./clientes.routes";
import pedidosRoutes from "./pedidos.routes";
import { Cliente } from "../database/models/Cliente";

const routes = Router();

routes.use("/produto", productsRoutes);

routes.use("/cliente", clienteRoutes);

routes.use("/pedido", pedidosRoutes);

routes.post("/clear", async (request, response) => {
  try {
    const manager = getManager();
    await manager.query("SET FOREIGN_KEY_CHECKS=0");
    await manager.clear(Cliente);
    await manager.query("SET FOREIGN_KEY_CHECKS=1");

    return response.status(201).json("tabelas limpas com sucesso");
  } catch (err) {
    console.error("Clear router error =>", err.message);
  }
});

export default routes;
