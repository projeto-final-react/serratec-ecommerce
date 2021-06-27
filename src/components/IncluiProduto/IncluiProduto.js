import React, { useState, useEffect } from "react";
import utilStorage from '../../utils/storage'
import apiUsuario from "../../service/ApiCarrinho";
import { Botao } from "../../styles/buttons-styles";
import { DivGrupo } from "../../styles/geral-styles";
import { Link } from "react-router-dom";
import ApiPedido from '../../service/ApiPedido'
import ApiCarrinho from "../../service/ApiCarrinho";

const IncluiProduto = (props) => {

  const [quantidadeProduto, setquantidadeProduto] = useState('')
  const [pedido, setPedido] = useState('')

  const novoPedido = {
    idCliente: utilStorage.getId(),
    produtosDoPedido: [
      {
        idProduto: props.idProduto,
        quantidade: quantidadeProduto
      }
    ]
  }

  const pedidoAtual = {
    idPedido: utilStorage.getPedido(),
    idProduto: props.idProduto,
    quantidade: quantidadeProduto
  }

  function setValores(e) {
    setquantidadeProduto(e.target.value)
    setPedido(novoPedido)
  }

  const CriarPedido = () => {
    ApiPedido.criar(pedido)
      .then((response) => {
        const { idPedido } = response.data;
        const { NumeroPedido } = response.data;
        utilStorage.savePedido(idPedido)
        utilStorage.salvarNumeroPedido(NumeroPedido)
        alert('Item adicionado ao carrinho com sucesso')
        window.open('/carrinho', '_self')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const CriaOuAtualizaPedido = () => {

    console.log(pedidoAtual)
    if (!utilStorage.obterTokenNaStorage) {
      window.open('/login', '_self')
    }
    if (utilStorage.pegaNumeroPedido()) {
      if (utilStorage.getPedido()) {
        console.log(pedidoAtual)
        ApiCarrinho.adicionaDetalhePedido(pedidoAtual)
          .then((response) => {
            console.log(response)
            window.open('/carrinho', '_self')
          })
          .catch((error) => {
            console.log(error)
          })
      }
    } else {
      CriarPedido()
    }
  }

  return (
    <div>
      <DivGrupo>
        <h1>Carrinho</h1>
        <h1>Quantidade: {quantidadeProduto}</h1>
        <h1>id do produto: {props.idProduto}</h1>
        <form >
          <div className="dados">
            <label htmlFor="text">Quantidade </label>
            <br />
            <input
              itemID="text"
              type="text"
              onChange={(e) => setValores(e)}
            />
          </div>
        </form>
        <div className="butons">
          <Botao
            to={'/carrinho'}
            onClick={CriaOuAtualizaPedido}
            type="submit">{
              utilStorage.pegaNumeroPedido() ? 'Adicionar ao carrinho' : 'Criar Pedido'}
          </Botao>
          <Link to={"/pagamento"}>
            <Botao>Comprar agora</Botao>
          </Link>
          <Botao background={"#fff"}>
            <Link to={"/"}>Voltar</Link>
          </Botao>
        </div>
      </DivGrupo>
    </div>
  );
};

export default IncluiProduto;
