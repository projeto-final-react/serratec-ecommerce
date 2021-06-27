import React, { useState, useEffect } from 'react';
import ApiProduto from '../../service/ApiProduto'
import MeuCard from '../../components/Card/MeuCard';
import { ContainerprodutoWay } from '../../styles/container-produto-styled'
import { Link } from 'react-router-dom';


const Home = () => {

    const [produtos, setProdutos] = useState([])

    // const filtraProdutoPorCategoria = (listaDeProdutos = []) => {
    //     return listaDeProdutos.reduce(
    //         (listaFiltrada, produtoAtual) => {
    //             listaFiltrada[produtoAtual.idCategoria] = listaFiltrada[produtoAtual.idCategoria] || [];
    //             listaFiltrada[produtoAtual.idCategoria].push(produtoAtual);
    //             return listaFiltrada
    //         }, {}
    //     )
    // }
    // console.log(filtraProdutoPorCategoria(produtos))

    // const frete = filtraProdutoPorCategoria(produtos)['3'] || []
    // console.log(frete)

    const obterProdutos = () => {
        ApiProduto.getProduto()
            .then((resposta => {
                setProdutos(resposta.data);
                // console.log(resposta);
            }))
            .catch((erro => {
                console.log(erro)
            }));
    }

    useEffect(() => {
        obterProdutos();
    }, [])

    return (
        // <div className='container-produtos'>
        <ContainerprodutoWay>
            {produtos.map(produto => (
                <Link to={'/produtos/' + produto.id} key={produto.id}>
                    <MeuCard
                        img={produto.url}
                        nome={produto.nome}
                        descricao={produto.descricao}
                        preco={produto.preco}
                    />
                </Link>
            ))
            }
        </ContainerprodutoWay>
        // </div>
    );
}

export default Home;
