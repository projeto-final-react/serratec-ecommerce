import api from "./Api";

function criar(pedido) {
  return new Promise((resolve, reject) => {
    return api.post('/pedido', pedido)
      .then(response => resolve(response))
      .catch(error => reject(error))
  });
}

function atulizar(id, pedido) {
  return new Promise((resolve, reject) => {
    return api.put('/pedido/' + id, pedido)
      .then(response => resolve(response))
      .catch(error => reject(error))
  });
}

export default {
  criar,
  atulizar
}
