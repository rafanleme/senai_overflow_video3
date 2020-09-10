//configura a aplicação

const express = require("express");
const cors = require("cors");
require("./database");
const rotas = require("./routes");

//iniciando a aplicação
const app = express();

//habilitar o cors para qualquer origem
app.use(cors());

//nas requisições pode ter corpos no formato json
app.use(express.json());

//cadastrando as rotas
app.use(rotas);

module.exports = app;
