const Aluno = require("../models/Aluno");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.json")

module.exports = {
  async store(req, res) {
    const { email, senha } = req.body;

    //verficiar se o aluno existe e se a senha está correta
    // SELECT * FROM aluno WHERE email = ?
    const aluno = await Aluno.findOne({
      where: {
        email,
      },
    });

    //se o aluno não existir ou a senha estiver incorreta
    //retorna erro
    if (!aluno || !bcrypt.compareSync(senha, aluno.senha)) {
      return res.status(403).send({ erro: "Usuário e/ou senha inválidos" });
    }

    const token = jwt.sign({ alunoId: aluno.id }, authConfig.secret);

    //se existir e a senha estiver correta retorna ok com o token
    res.status(201).send({
      aluno: {
        alunoId: aluno.id,
        nome: aluno.nome,
        ra: aluno.ra,
      },
      token
    });
  },
};
