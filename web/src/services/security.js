import { api } from "./api";

const CHAVE_ALUNO = "@aluno";

export const signIn = (aluno) => {
  localStorage.setItem(CHAVE_ALUNO, JSON.stringify(aluno));

  api.defaults.headers.common['Authorization'] = `Bearer ${aluno.token}`;
};

export const signOut = () => {
  localStorage.clear();

  api.defaults.headers.common['Authorization'] = undefined;
};

export const getAluno = () => {
  const { aluno } = JSON.parse(localStorage.getItem(CHAVE_ALUNO));

  return aluno;
};

export const isSignedIn = () => {
  const aluno = JSON.parse(localStorage.getItem(CHAVE_ALUNO));

  if(aluno){
    api.defaults.headers.common['Authorization'] = `Bearer ${aluno.token}`;
  }

  // aqui futuramente vamos implementar a verificação do token

  return aluno ? true : false;
};
