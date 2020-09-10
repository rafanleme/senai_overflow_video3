import React, { useState } from "react";

import {
  Container,
  ImageCropped,
  Form,
  Titulo,
  SubTitulo,
  InputGroup,
  Button,
} from "./styles";

import foto from "../../assets/foto.jpg";
import { api } from "../../services/api";

import Alerts from "../../components/Alerts";
import { useHistory } from "react-router-dom";
import { signIn } from "../../services/security";

const FormLogin = (props) => {
  const history = useHistory();

  const [alunoLogin, setAlunoLogin] = useState({
    email: "",
    senha: "",
  });

  const entrar = async (e) => {
    e.preventDefault();

    try {
      const retorno = await api.post("/sessao", alunoLogin);

      if (retorno.status === 201) {
        //vai logar na aplicação
        signIn(retorno.data);

        //redirecionar para tela Home
        return history.push("/home");
      }
    } catch (erro) {
      if (erro.response) {
        return props.setMensagem(erro.response.data.erro);
      }

      props.setMensagem("Ops, algo deu errado, tente novamente.");
    }
  };

  const handlerInput = (e) => {
    setAlunoLogin({ ...alunoLogin, [e.target.id]: e.target.value });
  };

  return (
    <Form onSubmit={entrar}>
      <Titulo>SENAI OVERFLOW</Titulo>
      <SubTitulo>Compartilhe suas dúvidas</SubTitulo>
      <InputGroup>
        <label>E-Mail</label>
        <input
          type="email"
          id="email"
          value={alunoLogin.email}
          onChange={handlerInput}
          placeholder="Insira seu e-mail"
          required
        />
      </InputGroup>
      <InputGroup>
        <label>Senha</label>
        <input
          type="password"
          id="senha"
          value={alunoLogin.senha}
          onChange={handlerInput}
          placeholder="Insira sua senha"
          required
        />
      </InputGroup>
      <Button type="submit">Entrar</Button>
      <Button
        type="button"
        onClick={() => {
          props.mostrarForm("registrar");
        }}
      >
        Registrar-se
      </Button>
    </Form>
  );
};

const FormRegistrar = (props) => {
  const history = useHistory();

  const [alunoRegistrar, setAlunoRegistrar] = useState({
    ra: "",
    nome: "",
    email: "",
    senha: "",
  });

  const registrar = async (e) => {
    e.preventDefault();

    try {
      const retorno = await api.post("/alunos", alunoRegistrar);

      if (retorno.status === 201) {
        //vai logar na aplicação
        signIn(retorno.data);

        //redirecionar para tela Home
        return history.push("/home");
      }
    } catch (erro) {
      if (erro.response) {
        return props.setMensagem(erro.response.data.erro);
      }

      props.setMensagem("Ops, algo deu errado, tente novamente.");
    }
  };

  const handlerInput = (e) => {
    setAlunoRegistrar({ ...alunoRegistrar, [e.target.id]: e.target.value });
  };

  return (
    <Form onSubmit={registrar}>
      <Titulo>SENAI OVERFLOW</Titulo>
      <SubTitulo>Compartilhe suas dúvidas</SubTitulo>
      <InputGroup>
        <label>RA</label>
        <input
          type="number"
          id="ra"
          value={alunoRegistrar.ra}
          onChange={handlerInput}
          placeholder="Insira seu RA"
          required
        />
      </InputGroup>
      <InputGroup>
        <label>Nome</label>
        <input
          type="text"
          id="nome"
          value={alunoRegistrar.nome}
          onChange={handlerInput}
          placeholder="Insira seu nome"
          required
        />
      </InputGroup>
      <InputGroup>
        <label>E-Mail</label>
        <input
          type="email"
          id="email"
          value={alunoRegistrar.email}
          onChange={handlerInput}
          placeholder="Insira seu e-mail"
          required
        />
      </InputGroup>
      <InputGroup>
        <label>Senha</label>
        <input
          type="password"
          id="senha"
          value={alunoRegistrar.senha}
          onChange={handlerInput}
          placeholder="Insira sua senha"
          required
        />
      </InputGroup>
      <Button type="submit">Enviar</Button>
      <Button
        type="button"
        onClick={() => {
          props.mostrarForm("login");
        }}
      >
        Já tenho cadastro
      </Button>
    </Form>
  );
};

const Login = () => {
  const [mostrarForm, setMostrarForm] = useState("login");
  const [mensagem, setMensagem] = useState("");

  return (
    <Container>
      <Alerts mensagem={mensagem} setMensagem={setMensagem} tipo="erro" />
      <ImageCropped>
        <img src={foto} alt="Imagem de capa" />
      </ImageCropped>
      {mostrarForm === "login" ? (
        <FormLogin setMensagem={setMensagem} mostrarForm={setMostrarForm} />
      ) : (
        <FormRegistrar setMensagem={setMensagem} mostrarForm={setMostrarForm} />
      )}
    </Container>
  );
};

export default Login;
