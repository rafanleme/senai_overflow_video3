const Comentario = require("../models/Comentario");
const Postagem = require("../models/Postagem");

module.exports = {
  // implementar a listagem de comentários
  async index(req, res) {
    //recuperar o id da postagem
    const { postId } = req.params;

    const postagem = await Postagem.findByPk(postId);

    if (!postagem) {
      return res.status(404).send({ erro: "Postagem não encontrada" });
    }

    const comentarios = await postagem.getComentarios({
      include: {
        association: "Aluno",
        as: "aluno",
        attributes: ["id", "nome"],
      },
      attributes: ["id", "descricao", "created_at"],
      order: [["created_at", "ASC"]],
    });

    res.send(comentarios);
  },

  // implementar a inserção de comentários
  async store(req, res) {
    //recuperar o id do aluno
    const alunoId = req.alunoId;

    //recuperar o id da postagem
    const { postId } = req.params;

    //recuperar a descricao do comentario
    const { descricao } = req.body;

    console.log(req.body);

    //procurar a postagem pelo id
    const postagem = await Postagem.findByPk(postId);

    //se não existir, retornar erro
    if (!postagem) {
      return res.status(404).send({ erro: "Postagem não encontrada" });
    }

    //criar o comentário usando o createComentario
    //passando o id do aluno e a descricao
    let comentario = await postagem.createComentario({
      descricao,
      aluno_id: alunoId,
    });

    //formatando o retorno
    comentario = comentario.dataValues;
    comentario.postagem_id = comentario.PostagemId;
    delete comentario.PostagemId;
    delete comentario.AlunoId;

    //responder com status de criado com sucesso
    res.status(201).send(comentario);
  },
};
