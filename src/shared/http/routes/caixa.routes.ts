import { Router } from "express";

const caixaRoutes = Router();

caixaRoutes.get("/", async (req, res) => {
  res.send("Rota de caixa");
});

export default caixaRoutes;
/*
  1 - Cadastrar um caixa(Post)
    1.1 - data, hora abertura, valor entrada, hora fechamento, observações;  
  2 - Editar caixa(Put)
    2.1 - data, hora abertura, valor entrada, hora fechamento, observações;
  3 - Listar UM caixa(Get/id|nome)
  4 - Lista TODOS os caixas(Get/)
*/
