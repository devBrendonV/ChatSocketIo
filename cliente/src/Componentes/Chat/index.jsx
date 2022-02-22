import React, { useState, useEffect } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { Container, Mensagem } from "./styles";
const Chat = ({ socket, nome, sala,hidden,desconectar }) => {
  const [mensagem, setMensagem] = useState("");
  const [mensagens, setMensagens] = useState([]);
  const enviarMensagem = async () => {
    if (mensagem.trim().length > 0) {
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
      salvarMensagem(
        mensagemAtual.mensagem,
        mensagemAtual.usuario,
        mensagemAtual.data
      );
    }
    setMensagem('')
  };

  function salvarMensagem(mensagem, usuario, data) {
    setMensagens((lista) => {
      return [
        ...lista,
        <Mensagem send={true}>
          <p>{mensagem}</p>
          <p>
            {usuario} {data}
          </p>
        </Mensagem>,
      ];
    });
  }
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMensagens((lista) => {
        return [
          ...lista,
          <Mensagem send={false}>
            <p>{data.mensagem}</p>
            <p>
              {data.usuario} {data.data}
            </p>
          </Mensagem>,
        ];
      });
    });
  }, [socket]);

  return (
    <Container hidden={hidden} className="main">
      <button onClick={()=>desconectar(false)}>x</button>
      <div className="cheader"></div>
      <ScrollToBottom className="cbody">{mensagens}</ScrollToBottom>
      <div className="cfooter">
        <input
          onKeyPress={(e) =>{
            if(e.key === 'Enter'){
              enviarMensagem()
            }
          } }
          type="text"
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
        />
        <button onClick={() => enviarMensagem()}>&#9658;</button>
      </div>
    </Container>
  );
};

export default Chat;
