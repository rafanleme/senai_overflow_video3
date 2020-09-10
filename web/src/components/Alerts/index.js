import React, { useRef, useEffect } from "react";

import { Alert } from "./styles";

function Alerts(props) {
  const { mensagem, tipo, setMensagem } = props;
  const alertEl = useRef();

  useEffect(() => {
    if (mensagem) {
      alertEl.current.style.width = "300px";
    } else {
      alertEl.current.style.width = "0px";
    }
  }, [mensagem]);

  return (
    <Alert ref={alertEl} tipo={tipo}>
      <h1>{mensagem}</h1>
      {mensagem && (
        <p
          onClick={() => {
            setMensagem(undefined);
          }}
        >
          &times;
        </p>
      )}
    </Alert>
  );
}

export default Alerts;
