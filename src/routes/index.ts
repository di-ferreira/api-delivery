import { Router } from "express";
import cardapioRoutes from "./cardapio.routes";
import clienteRoutes from "./clientes.routes";
import pedidosRoutes from "./pedidos.routes";

const routes = Router();

routes.use("/cardapio", cardapioRoutes);

routes.use("/cliente", clienteRoutes);

routes.use("/pedido", pedidosRoutes);

export default routes;
