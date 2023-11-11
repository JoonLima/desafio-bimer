import ProdutoModel from "@/models/produto-model";

const NOME_PADRAO = 'Produto Teste'
const QUANTIDADE_PADRAO = 10

let produtoPadrao = new ProdutoModel()
produtoPadrao.nome = 'Produto Padrão'
produtoPadrao.quantidadeEstoque = 50

describe('produto-model.vue', () => {
    
    it('Deve retornar falso modelo produto sem nenhum dado.', () => {
        let produtoModel = new ProdutoModel()
        expect(produtoModel.modeloValido()).toBeFalsy();
    })

    it('Deve retornar falso modelo produto sem nome informado.', () => {
        let produtoModel = new ProdutoModel({quantidadeEstoque: QUANTIDADE_PADRAO})
        expect(produtoModel.modeloValido()).toBeFalsy();
    })

    it('Deve retornar falso modelo produto sem quantidade informada.', () => {
        let produtoModel = new ProdutoModel({nome: NOME_PADRAO})
        expect(produtoModel.modeloValido()).toBeFalsy();
    })

    it('Deve retornar verdadeiro modelo produto com todos os dados informados.', () => {
        let produtoModel = new ProdutoModel(produtoPadrao)
        expect(produtoModel.modeloValido()).toBeTruthy();
    })
})