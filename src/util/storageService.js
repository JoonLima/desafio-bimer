import Usuario from "@/models/usuario-model";

function salvarUsuarioNaStorage(usuario) {
  let usuarioStorage = JSON.stringify(usuario);
  localStorage.setItem("usuario", usuarioStorage);
}

function obterUsuarioNaStorage() {
  let usuarioStorage = localStorage.getItem("usuario");
  return new Usuario(JSON.parse(usuarioStorage));
}

function salvarTokenNaStorage(token) {
  localStorage.setItem("token", token);
}

function obterTokenNaStorage() {
  return localStorage.getItem("token");
}

function removerTokenNaStorage() {
  localStorage.removeItem("token");
}

function removerUsuarioNaStorage() {
  localStorage.removeItem("usuario");
}

export default {
  salvarUsuarioNaStorage,
  obterUsuarioNaStorage,
  salvarTokenNaStorage,
  obterTokenNaStorage,
  removerTokenNaStorage,
  removerUsuarioNaStorage,
};
