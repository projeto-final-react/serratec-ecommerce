import React, { useState, useEffect } from "react";
import utilStorage from '../../utils/storage'
import apiUsuario from "../../service/ApiUsuario";
import { Botao, BotaoSecundario } from "../../styles/buttons-styles";
import { DivGrupo } from "../../styles/geral-styles";
import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [senha, setSenha] = useState("");

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleSenha = (e) => {
    setSenha(e.target.value);
  };

  const realizarLogin = (e) => {
    e.preventDefault();
    if (!username || !senha) {
      alert("Favor informar e-mail e senha");
      return;
    }

    apiUsuario
      .logar(username, senha)
      .then((resposta) => {
        const { Authorization } = resposta.data;
        const { idCliente } = resposta.data;
        console.log(resposta);
        utilStorage.salvarTokenNaStorage(Authorization);
        utilStorage.saveId(idCliente);
        window.open("/", "_self");
      })
      .catch((erro) => {
        // Aqui poderia mandar mensagem personalizada ao usuario.
        console.log(erro);
      });
  };

  useEffect(() => {
    let token = utilStorage.obterTokenNaStorage();

    if (token) {
      window.open("/", "_self");
    }
  });

  return (
    <div>
      <form onSubmit={realizarLogin}>
        <DivGrupo>
          <h1>Login</h1>
          <div className="dados">
            <label htmlFor="username"> Username* </label>
            <br />
            <input
              itemID="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={handleUsername}
            />
          </div>
          <div className="dados senha">
            <label htmlFor="senha"> Senha* </label>
            <br />
            <input
              itemID="senha"
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={handleSenha}
            />
          </div>
          <div className="butons">
            <Botao background={"#481ed6"}> Continuar </Botao>
            <p>
              Ao continuar você concorda com as Condições de Uso Do
              Serra-ECommerce
            </p>
          </div>
          <div className="butons">
            <Link to={"/cadastro"}> Esqueci minha senha</Link>
            <Botao background={"#fff"}>
              <Link to={"/cadastro"}> Crie sua conta grátis</Link>
            </Botao>
          </div>
        </DivGrupo>
      </form>
    </div>
  );
};

export default Login;
