import React, { useEffect, useState } from "react";

import { FiGithub, FiLogOut } from "react-icons/fi";
import "./styles.css";

import fotoPerfil from "../../assets/foto_perfil.png";
import imgPost from "../../assets/post-exemplo.jpg";
import { signOut, getAluno } from "../../services/security";
import { useHistory } from "react-router-dom";
import { api } from "../../services/api";
import Alerts from "../../components/Alerts";
import Popup from "../../components/Popup";

const CardPost = ({ post }) => {
  const [mostrarComentarios, setMostrarComentarios] = useState(false);
  const [comentarios, setComentarios] = useState([]);
  const [novoComentario, setNovoComentario] = useState("");

  const carregarComentarios = async () => {
    try {
      if (!mostrarComentarios) {
        const retorno = await api.get(`/postagens/${post.id}/comentarios`);
        setComentarios(retorno.data);
      }
      setMostrarComentarios(!mostrarComentarios);
    } catch (erro) {
      console.log(erro);
    }
  };

  const criarComentario = async (e) => {
    e.preventDefault();

    try {
      //chamada para a api, criando um novo comentario
      const retorno = await api.post(`/postagens/${post.id}/comentarios`, {
        descricao: novoComentario,
      });

      //recebe o retorno da api com o comentario criado
      let comentario = retorno.data;

      //coloca os dados do aluno logado no comentario criado
      comentario.Aluno = getAluno();

      //atualiza a lista inserindo o novo comentário
      //seta a lista com o que ela já tinha, e com o novo comentário
      setComentarios([...comentarios, comentario]);

      //limpa o campo novo comentário
      setNovoComentario("");
    } catch (erro) {
      console.log(erro);
    }
  };

  return (
    <div className="card-post">
      <header>
        <img src={fotoPerfil} alt="Foto de Perfil" />
        <strong>{post.Aluno.nome}</strong>
        <p> {post.createdAt}</p>

        {/* renderização condicionarl, só mostra o icone se gists for verdadeiro */}
        {post.gists && <FiGithub className="icon" size={25} />}
      </header>
      <section>
        <strong>{post.titulo}</strong>
        <p>{post.descricao}</p>
        <img src={imgPost} alt="Imagem do Post" />
      </section>
      <footer>
        <h1 onClick={carregarComentarios}>Comentários</h1>
        {mostrarComentarios && (
          <>
            {comentarios.length === 0 && <p>Seja o primeiro a comentar!</p>}
            {comentarios.map((c) => (
              <section key={c.id}>
                <header>
                  <img src={fotoPerfil} alt="Foto de Perfil" />
                  <strong>{c.Aluno.nome}</strong>
                  <p> {c.created_at}</p>
                </header>
                <p>{c.descricao}</p>
              </section>
            ))}
            <form className="novo-comentario" onSubmit={criarComentario}>
              <textarea
                value={novoComentario}
                onChange={(e) => {
                  setNovoComentario(e.target.value);
                }}
                placeholder="Comente essa dúvida!"
                required
              ></textarea>
              <button>Enviar</button>
            </form>
          </>
        )}
      </footer>
    </div>
  );
};

const NovaPostagem = ({ setMostrarNovaPostagem }) => {
  const [novaPostagem, setNovaPostagem] = useState({
    titulo: "",
    descricao: "",
    gists: "",
  });

  const fechar = () => {
    const { titulo, descricao, gists } = novaPostagem;

    if (
      (titulo || descricao || gists) &&
      !window.confirm("Tem certeza que quer abandonar a dúvida?")
    ) {
      return;
    }

    setMostrarNovaPostagem(false);
  };

  const handlerInput = (e) => {
    setNovaPostagem({ ...novaPostagem, [e.target.id]: e.target.value });
  };

  return (
    <Popup>
      <form className="nova-postagem">
        <span onClick={fechar}>&times;</span>
        <h1>Publique sua dúvida</h1>
        <label>Título</label>
        <input
          type="text"
          id="titulo"
          placeholder="Sobre o que é a sua dúvida"
          onChange={handlerInput}
        />
        <label>Descrição</label>
        <textarea
          id="descricao"
          placeholder="Descreva em detalhe, o que te aflinge?"
          onChange={handlerInput}
        ></textarea>
        <label>
          Gist <em>(Opcional)</em>
        </label>
        <input
          type="text"
          id="gists"
          placeholder="https://gist.github.com/rafanleme/603f1c420aa58ab42391446ddf221fe5"
          onChange={handlerInput}
        />
        <label>
          Imagem <em>(Opcional)</em>
        </label>
        <input type="file" />
        <img alt="preview" />
        <button>Enviar</button>
      </form>
    </Popup>
  );
};

function Home() {
  const history = useHistory();
  const [mensagem, setMensagem] = useState("");
  const [postagens, setPostagens] = useState([]);
  const [mostrarNovaPostagem, setMostrarNovaPostagem] = useState(false);

  useEffect(() => {
    const carregarPostagens = async () => {
      try {
        const retorno = await api.get("/postagens");

        setPostagens(retorno.data);
      } catch (erro) {
        if (erro.response) {
          return setMensagem(erro.response.data.erro);
        }

        setMensagem("Ops, algo deu errado, tente novamente.");
      }
    };

    carregarPostagens();
  }, []);

  const alunoSessao = getAluno();

  return (
    <div className="container">
      <Alerts mensagem={mensagem} setMensagem={setMensagem} tipo="erro" />
      {mostrarNovaPostagem && (
        <NovaPostagem setMostrarNovaPostagem={setMostrarNovaPostagem} />
      )}
      <header className="header">
        <div>
          <p>SENAI OVERFLOW</p>
        </div>
        <div>
          <input type="search" placeholder="Pesquisar uma Dúvida" />
        </div>
        <div>
          <button
            className="btnSair"
            onClick={() => {
              signOut();
              history.replace("/");
            }}
          >
            Sair <FiLogOut />
          </button>
        </div>
      </header>
      <div className="content">
        <section className="profile">
          <img src={fotoPerfil} alt="Foto de Perfil" />
          <label>Editar Foto</label>
          <strong>Nome:</strong>
          <p>{alunoSessao.nome}</p>
          <strong>Ra:</strong>
          <p>{alunoSessao.ra}</p>
        </section>
        <section className="feed">
          {postagens.map((post) => (
            <CardPost key={post.id} post={post} />
          ))}
        </section>
        <section className="actions">
          <button
            onClick={() => {
              setMostrarNovaPostagem(true);
            }}
          >
            Nova Postagem
          </button>
        </section>
      </div>
    </div>
  );
}

export default Home;
