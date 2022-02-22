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
  display: flex;
`
function App() {
  const [nome, setNome] = useState("");
  const [sala, setSala] = useState("");

  function logar() {
    if (nome !== "" && sala !== "") {
      socket.emit("join_room", sala);
    }
  }

  return (
    <Container className="App">
      <CardLogin>
        <h3>Chat de conversa</h3>
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
            setSala(e.target.value);
          }}
        />
        <button onClick={() => logar()}>Entrar na sala</button>
      </CardLogin>
      <Chat socket={socket} nome={nome} sala={sala} />
    </Container>
  );
}

export default App;
