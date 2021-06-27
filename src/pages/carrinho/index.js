import React, { useState, useEffect } from 'react';
import ApiCarrinho from '../../service/ApiCarrinho';
import { Link } from 'react-router-dom';
import utilStorage from '../../utils/storage'

const Carrinho = () => {

    var respostaFiltrada
    const [produtos, setProdutos] = useState([]);

    let pedido = localStorage.getItem('idPedido')
    const obterProdutosCarrinho = async () => {
        if (pedido) {
            const resposta = await ApiCarrinho.getDetalhesPedido();
            let tempResposta = resposta.data
            respostaFiltrada = tempResposta.filter(produto => (produto.idPedido == pedido))
            respostaFiltrada = respostaFiltrada.sort((a, b) => {
                return a.id - b.id;
            });
            setProdutos(respostaFiltrada);
        }
    }

    function atualizaDetalhe(id, detalhePedido) {
        ApiCarrinho.atualizaDetalhePedido(id, detalhePedido)
            .then((resposta) => {
                console.log(resposta)
                obterProdutosCarrinho()
            })
            .catch((erro) => {
                alert("ops, aconteceu algo inesperado!")
                console.log(erro)
            })
    }

    useEffect(() => {
        let token = utilStorage.obterTokenNaStorage();
        if (!token) {
            window.open("/login", "_self");
        }
        obterProdutosCarrinho()
    }, [])

    if (!pedido) {
        return (
            <div>
                <p>Nem item no carrinho</p>
                <Link to={'/'}>
                    <button>Adicionar</button>
                </Link>
            </div>
        );
    } else {
        return (
            <div className='container-produtos'>
                <h1>Carrinho</h1>
                {produtos.map((produto, index) => (
                    <div key={produto.id}>
                        <p value={produto.idProduto}>Nome do Produto: {produto.idProduto}</p>
                        <p value={produto.idProduto}>Nome do Detalhe: {produto.id}</p>
                        <p>Valor do Produto: {produto.precoDoProduto}</p>
                        <button
                            onClick={() => {
                                let pro = [...produtos]
                                let newProduto = produto
                                newProduto.quantidadeProdutos++
                                pro[index] = newProduto
                                setProdutos(pro)
                                let dtoProduto = {
                                    idPedido: produto.idPedido,
                                    idProduto: produto.idProduto,
                                    quantidade: produto.quantidadeProdutos
                                }
                                atualizaDetalhe(newProduto.id, dtoProduto)
                            }}
                            type="number"
                        >
                            +
                        </button>
                        <p>Quantidade: {produto.quantidadeProdutos}</p>
                        <button
                            onClick={() => {
                                let pro = [...produtos]
                                let newProduto = produto
                                newProduto.quantidadeProdutos--
                                pro[index] = newProduto
                                setProdutos(pro)
                                let dtoProduto = {
                                    idPedido: produto.idPedido,
                                    idProduto: produto.idProduto,
                                    quantidade: produto.quantidadeProdutos
                                }
                                atualizaDetalhe(newProduto.id, dtoProduto)
                            }}
                            type="number"
                        >-</button>
                        <p>Valor por Produto: {produto.precoDoProduto * produto.quantidadeProdutos}</p>
                    </div>
                ))}
                <Link to={'/pagamento/'}>
                    <div>
                        <button>Finalizar</button>
                    </div>
                </Link>
            </div>
        );
    }

}
export default Carrinho;
