import React, { useState, useEffect } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { Container, Mensagem, SemMensagens } from "./styles";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { nanoid } from "nanoid";

const Chat = ({ socket, nome, sala, hidden, desconectar }) => {
  const [mensagem, setMensagem] = useState("");
  const [mensagens, setMensagens] = useState([]);
  const enviarMensagem = async () => {
    let b = new Date(Date.now()).getMinutes();
    if (mensagem.trim().length > 0) {
      const mensagemAtual = {
        sala: sala,
        usuario: nome,
        mensagem: mensagem,
        data:
          new Date(Date.now()).getHours() +
          ":" +
          `${
            new Date(Date.now()).getMinutes() < 10
              ? "0" + new Date(Date.now()).getMinutes()
              : new Date(Date.now()).getMinutes()
          }`,
      };
      await socket.emit("send_message", mensagemAtual);
      setMensagens((lista) => {
        return [
          ...lista,
          <Mensagem key={nanoid()} send={true}>
            <p>{mensagemAtual.mensagem}</p>
            <p>Você {mensagemAtual.data}</p>
          </Mensagem>,
        ];
      });
    }
    setMensagem("");
  };
  useEffect(() => {
    setMensagens([]);
  }, [desconectar]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMensagens((lista) => {
        return [
          ...lista,
          <Mensagem key={nanoid()} send={false}>
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
    <Container hidden={hidden}>
      <div className="header">
        <span>
          {" "}
          Sala atual: <strong>{sala}</strong>
        </span>
        <AiOutlineCloseCircle
          className="desconectar"
          onClick={() => desconectar(false)}
        ></AiOutlineCloseCircle>
      </div>
      <ScrollToBottom className="body">
        {mensagens.length === 0 ? (
          <SemMensagens>Inicie a conversa</SemMensagens>
        ) : (
          mensagens
        )}
      </ScrollToBottom>
      <div className="footer">
        <input
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              enviarMensagem();
            }
          }}
          placeholder="Digite sua mensagem..."
          type="text"
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
        />
        <button disabled={!mensagem.trim().length > 0} onClick={() => enviarMensagem()}>&#9658;</button>
      </div>
    </Container>
  );
};

export default Chat;
