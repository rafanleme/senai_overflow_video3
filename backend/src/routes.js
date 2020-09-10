//esse arquivo tem como responsabilidade cadastrar as rotas da aplicação

const express = require("express");
const { route } = require("./app");

const multer = require("multer");

const Multer = multer({
  storage: multer.memoryStorage(),
  limits: 1024 * 1024,
});

//criando o routerizador
const routes = express.Router();

const autorizacaoMid = require("./middlewares/autorizacao");
// const uploadImage = require("./services/firebase");

const alunoController = require("./controllers/aluno");
const postagemController = require("./controllers/postagem");
const comentarioController = require("./controllers/comentario");
const sessaoController = require("./controllers/sessao");

//rotas públicas
routes.post("/sessao", sessaoController.store);
routes.post("/alunos", alunoController.store);

//middleware de proteção das rotas
routes.use(autorizacaoMid);

//rotas de usuário
routes.get("/alunos", alunoController.listar);
routes.get("/alunos/:id", alunoController.buscarPorId);

//rotas de postagens
routes.get("/postagens", postagemController.index);
routes.post("/postagens", Multer.single("imagem"),  postagemController.store);
routes.delete("/postagens/:id", postagemController.delete);

//rotas de comentarios
routes.get("/postagens/:postId/comentarios", comentarioController.index);
routes.post("/postagens/:postId/comentarios", comentarioController.store);

module.exports = routes;
