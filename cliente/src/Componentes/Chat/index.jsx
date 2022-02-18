import React, { useState, useEffect } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { Container } from "./styles";
const Chat = ({ socket, nome, sala }) => {
  const [mensagem, setMensagem] = useState("");
  const [mensagens, setMensagens] = useState([]);
  let arr = [];
  function mapear() {
    console.log(arr);
    const alterado = arr.map((recebido) => {
      return <div>{recebido}</div>;
    });
    setMensagens(alterado);
  }
  const enviarMensagem = async () => {
    if (mensagem !== "") {
      const mensagemAtual = {
        sala: sala,
        usuario: nome,
        mensagem: mensagem,
        data:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", mensagemAtual);
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      arr.push(data.mensagem);
      mapear();
    });
  }, [socket]);

  return (
    <Container className="main">
      <div className="cheader"></div>
      <ScrollToBottom className="cbody">
        <div>{mensagens}</div>
      </ScrollToBottom>
      <div className="cfooter">
        <input type="text" onChange={(e) => setMensagem(e.target.value)} />
        <button onClick={() => enviarMensagem()}>&#9658;</button>
      </div>
    </Container>
  );
};

export default Chat;
