export default class Cliente {
  constructor(obj) {
    obj = obj || {};

    this.id = obj.id;
    this.nome = obj.nome;
    this.cpfOuCnpj = obj.cpfOuCnpj;
    this.email = obj.email;
    this.telefone = obj.telefone;
    this.idUsuario = obj.idUsuario;
    this.dataCadastro = obj.dataCadastro;
  }

  modeloValido() {
    return !!(this.nome && this.cpfOuCnpj && this.email && this.telefone);
  }
}
