const Postagem = require("../models/Postagem");
const Aluno = require("../models/Aluno");

module.exports = {
  async index(req, res) {
    /**
     * SELECT p.*, a.id, a.nome, a.ra FROM postagens p
     * INNER JOIN aluno a ON p.created_aluno_id = a.id
     */
    const postagens = await Postagem.findAll({
      include: {
        association: "Aluno",
        attributes: ["id", "nome", "ra"],
      },
      order: [["created_at", "DESC"]],
    });

    res.send(postagens);
  },

  async store(req, res) {
    //pegar id do aluno logado
    const created_aluno_id = req.alunoId;

    return console.log(req.file);

    const { firebaseUrl } = req.file ? req.file : "";

    const { titulo, descricao, gists } = req.body;

    try {
      const aluno = await Aluno.findByPk(created_aluno_id);

      if (!aluno) {
        res.status(404).send({ erro: "Aluno não encontrado" });
      }

      let postagem = await aluno.createPostagem({
        titulo,
        descricao,
        imagem: firebaseUrl,
        gists,
      });

      res.status(201).send(postagem);
    } catch (error) {
      return res.status(500).send({
        erro:
          "Não foi possível adicionar a postagem, tente novamente mais tarde.",
      });
    }
  },

  async delete(req, res) {
    // pegando o id do aluno que está logado
    const created_aluno_id = req.alunoId;

    // pegando o id do post a apagar
    const { id } = req.params;

    // procura o post pelo id
    let postagem = await Postagem.findByPk(id);

    // se a postagem não existir, retorna not found
    if (!postagem) {
      return res.status(404).send({ erro: "Postagem não encontrada" });
    }

    // se o aluno logado for diferente do aluno que criou a postagem
    // retorna não autorizado
    if (postagem.created_aluno_id != created_aluno_id) {
      return res
        .status(401)
        .send({ erro: "Você não tem permissão para excluir essa postagem." });
    }

    // efetua a exclusão da postagem
    await postagem.destroy();

    res.status(204).send();
  },
};
