import { Router } from "express";

const pedidosRoutes = Router();

pedidosRoutes.get("/", async (req, res) => {
  res.send("Rota de pedidos");
});

export default pedidosRoutes;
/*
  1 - Cadastrar um pedido(Post)
    1.1 - Cliente, Itens, valor total, endereço de entrega, status, data pedido;  
  2 - Editar pedido(Put)
    2.1 - Cliente, Itens, valor total, endereço de entrega, status, data pedido; 
  3 - Listar UM pedido(Get/id|Cliente)
  4 - Lista TODOS os pedidos(Get/ |data)
*/
