import http from "@/services/api.js";

function obterTodos() {
  return new Promise((resolve, reject) => {
    return http
      .get("/clientes")
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
}

function obterPorId(id) {
  return new Promise((resolve, reject) => {
    return http
      .get(`/clientes/${id}`)
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
}

function cadastrar(cliente) {
  return new Promise((resolve, reject) => {
    return http
      .post("/clientes", cliente)
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
}

function atualizar(cliente) {
  return new Promise((resolve, reject) => {
    return http
      .put(`/clientes/${cliente.id}`, cliente)
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
}

function deletar(id) {
  return new Promise((resolve, reject) => {
    return http
      .delete(`/clientes/${id}`)
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
}

export default {
  obterTodos,
  obterPorId,
  cadastrar,
  atualizar,
  deletar,
};
