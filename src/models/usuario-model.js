export default class Usuario {
  constructor(obj) {
    obj = obj || {};

    this.id = obj.id;
    this.email = obj.email;
    this.senha = obj.senha;
  }
}
