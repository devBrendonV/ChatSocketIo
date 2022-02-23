import styled from "styled-components";
import Chat from "./Componentes/Chat";
import { useState } from "react";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    122deg,
    rgba(228, 51, 60, 1) 0%,
    rgba(36, 31, 0, 1) 5%,
    rgba(77, 36, 167, 1) 76%,
    rgba(133, 100, 208, 1) 82%,
    rgba(46, 0, 255, 1) 96%
  );
`;
const CardLogin = styled.div`
  display: ${(prop) => (prop.hidden ? "none" : "flex")};
  flex-direction: column;
  align-items: center;
  width: 200px;
  margin: auto;
  padding: 10px;
  border-radius: 5px;
  height: 250px;
  background-color: #fff;
  font-size: 20px;
  input {
    font-size: 20px;
    width: 80%;
    margin-bottom: 10px;
    outline: none;
  }
  button {
    font-size: 18px;
    margin-top: 70px;
  }
`;
function App() {
  const [nome, setNome] = useState("");
  const [sala, setSala] = useState("");
  const [logado, setLogado] = useState(false);

  function logar() {
    if (nome !== "" && sala !== "") {
      socket.emit("join_room", { sala: sala, nome: nome });
      setLogado(true);
    }
  }
  function desconectar() {
    setLogado(false);
  }
  return (
    <Container className="App">
      <CardLogin hidden={logado}>
        <h3>CHAT-io</h3>
        <input
          autoFocus
          type="text"
          placeholder="Insira seu nome..."
          onChange={(e) => {
            setNome(e.target.value);
          }}
        />
        <input
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              logar();
            }
          }}
          type="text"
          placeholder="Insira a sala..."
          onChange={(e) => {
            setSala(e.target.value.trim());
          }}
        />
        <button onClick={() => logar()}>Entrar</button>
      </CardLogin>
      <Chat
        key={nome}
        desconectar={desconectar}
        hidden={!logado}
        socket={socket}
        nome={nome}
        sala={sala}
      />
    </Container>
  );
}

export default App;
