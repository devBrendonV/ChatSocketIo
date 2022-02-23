import styled from "styled-components";

export const Container = styled.div`
  display: ${(prop) => (prop.hidden ? "none" : "flex")};
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 10px;
  height: 500px;
  padding: 5px;
  background-color: #f7f7f7;
  border-radius: 5px;

  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    color: #474747;
  }
  .header strong {
    color: #762ef2;
  }

  .body {
    width: 350px;
    height: 90%;
    margin: 3px 0;
    background-color: #edebeb;
    overflow-y: auto;
    overflow-x: hidden;
    border: 1px solid #cccaca;
    border-radius: 5px;
  }
  .footer {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: 0px 10px;
    padding: 5px;
  }
  .desconectar {
    font-size: 25px;
    cursor: pointer;
    
  }
  input {
    width: 100%;
    height: 20px;
    font-size: 15px;
    outline: none;
    border: 1px solid #cccaca;
  }
  button{
    border: 1px solid #cccaca;
    cursor: pointer;
  }
`;

export const Mensagem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${(prop) => (prop.send ? "flex-end" : "flex-start")};
  p:nth-child(1) {
    color: #f3f2f5;
    background-color: ${(prop) => (prop.send ? "#3ec777" : "#3042e6")};
    padding: 10px;
    border-radius: 5px;
    width: auto;
    height: auto;
    margin-top: 3px;
    margin-bottom: 0px;
    word-break: break-all;
  }
  p:nth-child(2) {
    color: #9a9b9c;
    font-size: 15px;
    text-align: right;
    margin-top: 0px;
  }
  margin: 3px 5px;
`;

export const SemMensagens = styled.div`
  color: #9a9b9c;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
