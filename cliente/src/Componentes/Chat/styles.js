import styled from "styled-components";

export const Container = styled.div`
  .main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .cbody {
    width: 350px;
    height: 200px;
    background-color: #cfcfcf;
    overflow-y: auto;
    overflow-x: hidden;
  }
`;

export const Mensagem = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  align-items: ${(prop) => (prop.send ? "flex-end" : "flex-start")};
  
  p:nth-child(1) {
    background-color: ${(prop) => (prop.send ? "green" : "blue")};
    padding: 10px;
    border-radius: 5px;
    width: auto;
    height: auto;
    margin-top:3px;
    margin-bottom: 0px;
    word-break: break-all;
  }
  p:nth-child(2) {
    font-size: 15px;
    text-align: right;
    margin-top: 0px;
    
  }
  flex-wrap: wrap;
  margin: 3px 5px;
  box-sizing: border-box;
`;
