import { Router } from "express";

const productsRoutes = Router();

productsRoutes.get("/", async (req, res) => {
  res.send("Rota de cardapio");
});

export default productsRoutes;
/*
  1 - Cadastrar um item(Post)
    1.1 - Nome, valor, descrição;  
  2 - Editar item(Put)
    2.1 - Nome, valor, descrição;
  3 - Listar UM item(Get/id|nome)
  4 - Lista TODOS os itens(Get/)
*/
