function salvarTokenNaStorage(token) {
    localStorage.setItem('token', token)
}

function obterTokenNaStorage() {
    return localStorage.getItem('token');
}

function removerAutenticacao() {
    localStorage.removeItem("token");
}

function saveId(id) {
    localStorage.setItem('id', id);
}

function getId() {
    return localStorage.getItem('id');
}

function removeId() {
    localStorage.removeItem('id')
}

function savePedido(pedido) {
    localStorage.setItem('idPedido', pedido);
}

function getPedido() {
    return localStorage.getItem('idPedido');
}

function removePedido() {
    localStorage.removeItem('idPedido')
}

function salvarNumeroPedido(numeroPedido){
    localStorage.setItem('numeroPedido', numeroPedido)
}

function pegaNumeroPedido(){
    return localStorage.getItem('numeroPedido')
}

function deletaPedido(){
    localStorage.removeItem('numeroPedido')
}

export default {
    getId,
    saveId,
    removeId,
    getPedido,
    savePedido,
    deletaPedido,
    removePedido,
    pegaNumeroPedido,
    salvarNumeroPedido,
    obterTokenNaStorage,
    removerAutenticacao,
    salvarTokenNaStorage
}