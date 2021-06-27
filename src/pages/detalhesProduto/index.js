
import Header from '../../components/Header';
import {ContainerprodutoWay} from '../../styles/container-produto-styled';
import {MeuCardWay} from '../../styles/meu-card-styles';
import ApiProduto from '../../service/ApiProduto';
import React, { useState, useEffect } from 'react';
import MeuCard from '../../components/Card/MeuCard';
import CardeDetalheProduto from '../../components/Card/CardDetalheProduto'


const Detalhes = (props) => {

    const [produto, setProduto] = useState({})

    function obterProdutos(IdProduto) {
        ApiProduto.obterProdutoPorId(IdProduto)
            .then((response => {
                setProduto(response.data);
                console.log(response)
            }))
            .catch((error => {
                console.log(error)
            }))
    }

    const { id } = props.match.params;
   

    useEffect(() => {
        obterProdutos(id);
        console.log(id);
    }, [])

    return (
        <ContainerprodutoWay>
            <CardeDetalheProduto 
                img={produto.url} 
                nome={produto.nome} 
                descricao={produto.descricao} 
                preco={produto.preco} 
                categoria={produto.idCategoria}
                idProduto={id}
                />
        </ContainerprodutoWay>
    );
}

export default Detalhes
