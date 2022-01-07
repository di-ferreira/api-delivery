import { Router } from "express";

const pedidosRoutes = Router();

pedidosRoutes.get("/", async (req, res) => {
  res.send("Rota de pedidos");
});

export default pedidosRoutes;
/*
  1 - Cadastrar um pedido(Post)
    1.1 - Nome, valor, descrição;  
  2 - Editar pedido(Put)
    2.1 - Nome, valor, descrição;
  3 - Listar UM pedido(Get/id|nome)
  4 - Lista TODOS os itens(Get/)
*/
