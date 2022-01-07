import { Router } from "express";

const clienteRoutes = Router();

clienteRoutes.get("/", async (req, res) => {
  res.send("Rota de Cliente");
});

export default clienteRoutes;
/*
  1 - Cadastrar um cliente(Post)
    1.1 - Nome, contato,endereço;  
  2 - Editar cliente(Put)
    2.1 - Nome, contato,endereço;
  3 - Listar UM cliente(Get/id|nome)
  4 - Lista TODOS os itens(Get/)
*/
