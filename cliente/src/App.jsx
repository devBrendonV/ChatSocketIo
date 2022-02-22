import styled from "styled-components";
import Chat from "./Componentes/Chat";
import { useState } from "react";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: black;
`;
const CardLogin = styled.div`
  display: ${(prop) => (prop.hidden ? "none" : "flex")};
  flex-direction: column;
  align-items: center;
  width: 200px;
  margin:auto;
  padding:10px;
  border-radius: 5px;
  height: 250px;
  background-color: #fff;
  font-size: 20px;
  input{
  font-size: 20px;
    width: 80%;
    margin-bottom: 10px;
  }
  button{
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
      socket.emit("join_room", sala);
      setLogado(true);
    }
  }
  function desconectar(){
    setLogado(false)
    socket.emit("join_room", '');
  }
  return (
    <Container className="App">
      <CardLogin hidden={logado}>
        <h3>CHAT-io</h3>
        <input
          type="text"
          placeholder="Insira seu nome..."
          onChange={(e) => {
            setNome(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Insira a sala..."
          onChange={(e) => {
            setSala(e.target.value.trim());
          }}
        />
        <button onClick={() => logar()}>Entrar</button>
      </CardLogin>
      <Chat desconectar={desconectar} hidden={!logado} socket={socket} nome={nome} sala={sala} />
    </Container>
  );
}

export default App;
