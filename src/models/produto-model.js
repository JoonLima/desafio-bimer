import formatador from "@/util/formatador";

export default class Produto {
  constructor(obj) {
    obj = obj || {};

    this.id = obj.id;
    this.nome = obj.nome;
    this.valor = formatador.formatarEmReal(obj.valor) || 0;
    this.quantidadeEstoque = obj.quantidadeEstoque || 0;
    this.observacao = obj.observacao;
    this.dataCadastro = formatador.formatarData(obj.dataCadastro);
  }
}
