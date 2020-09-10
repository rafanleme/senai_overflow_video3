const { Op } = require("sequelize");
const Aluno = require("../models/Aluno");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.json")

module.exports = {
  //lista todos os alunos
  async listar(req, res) {
    const alunos = await Aluno.findAll();

    res.send(alunos);
  },

  // buscar um aluno pelo id
  async buscarPorId(req, res) {
    const { id } = req.params;

    // busca o aluno pela chave
    let aluno = await Aluno.findByPk(id, { raw: true });

    // verifica se o aluno não foi encontrado
    if (!aluno) {
      return res.status(404).send({ erro: "Aluno não encontrado" });
    }

    delete aluno.senha;

    // retorna o aluno encontrado
    res.send(aluno);
  },

  //metodo responsavel por fazer as inserções
  async store(req, res) {
    const { ra, nome, email, senha } = req.body;

    // verificar se aluno já existe
    // select * from alunos where ra = ? or email = ?
    let aluno = await Aluno.findOne({
      where: {
        [Op.or]: [{ ra: ra }, { email: email }],
      },
    });

    if (aluno) {
      return res.status(400).send({ erro: "Aluno já cadastrado" });
    }

    const senhaCripto = await bcrypt.hash(senha, 10);

    aluno = await Aluno.create({ ra, nome, email, senha: senhaCripto });

    const token = jwt.sign({alunoId: aluno.id}, authConfig.secret);

    res.status(201).send(
      {
        aluno: {
          alunoId: aluno.id,
          nome: aluno.nome,
          ra: aluno.ra,
        },
        token
      }
    );
  },

  update() {},

  delete() {},
};
