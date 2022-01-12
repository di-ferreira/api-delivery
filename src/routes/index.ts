import { Router } from "express";
import { getManager } from "typeorm";

import productsRoutes from "./products.routes";
import clienteRoutes from "./clientes.routes";
import pedidosRoutes from "./pedidos.routes";
import comboRoutes from "./combo.routes";
import Client from "../database/models/Client";
import PhoneNumbers from "../database/models/PhoneNumbers";
import Addresses from "../database/models/Addresses";

const routes = Router();

routes.use("/produto", productsRoutes);

routes.use("/combo", comboRoutes);

routes.use("/cliente", clienteRoutes);

routes.use("/pedido", pedidosRoutes);

routes.post("/clear", async (request, response) => {
  try {
    const manager = getManager();
    await manager.query("SET FOREIGN_KEY_CHECKS=0");
    await manager.clear(PhoneNumbers);
    await manager.clear(Addresses);
    await manager.clear(Client);
    await manager.query("SET FOREIGN_KEY_CHECKS=1");

    return response.status(201).json("tabelas limpas com sucesso");
  } catch (err) {
    console.error("Clear router error =>", err.message);
  }
});

export default routes;
