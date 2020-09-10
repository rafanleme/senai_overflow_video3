import styled from "styled-components";

export const Alert = styled.div`
  position: absolute;
  top: 0;
  right: 0;

  width: 0px;
  height: 60px;
  margin: 10px;

  z-index: 9;

  transition: width 0.2s;

  background-color: ${(props) =>
    props.tipo === "sucesso" ? "var(--alertSucesso)" : "var(--alertErro)"};
    
  > h1 {
    font-size: 18px;
    font-weight: 500;
    margin: 10px;

    color: var(--primary);
  }

  > p {
    position: absolute;
    top: 0;
    right: 0;

    margin: 0px 5px;

    cursor: pointer;
    font-size: 20px;

    :hover {
      color: var(--white);
    }
  }
`;
