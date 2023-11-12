import ProdutoModel from "@/models/produto-model";

const NOME_PADRAO = 'Produto Teste';
const VALOR_PADRAO = 1000;
const QUANTIDADE_PADRAO = 10;

let produtoPadrao = new ProdutoModel();
produtoPadrao.nome = 'Produto Padrão';
produtoPadrao.valor = 1500;
produtoPadrao.quantidadeEstoque = 50;

describe('produto-model.vue', () => {
    
    it('Deve retornar falso modelo produto sem nenhum dado.', () => {
        let produtoModel = new ProdutoModel()
        expect(produtoModel.modeloValido()).toBeFalsy();
    })

    it('Deve retornar falso modelo produto sem nome informado.', () => {
        let produtoModel = new ProdutoModel({valor: VALOR_PADRAO ,quantidadeEstoque: QUANTIDADE_PADRAO})
        expect(produtoModel.modeloValido()).toBeFalsy();
    })

    it('Deve retornar falso modelo produto sem valor informada.', () => {
        let produtoModel = new ProdutoModel({nome: NOME_PADRAO, quantidadeEstoque: QUANTIDADE_PADRAO})
        expect(produtoModel.modeloValido()).toBeFalsy();
    })

    it('Deve retornar falso modelo produto sem quantidade informada.', () => {
        let produtoModel = new ProdutoModel({nome: NOME_PADRAO, valor: VALOR_PADRAO})
        expect(produtoModel.modeloValido()).toBeFalsy();
    })

    it('Deve retornar verdadeiro modelo produto com todos os dados informados.', () => {
        let produtoModel = new ProdutoModel(produtoPadrao)
        expect(produtoModel.modeloValido()).toBeTruthy();
    })
})