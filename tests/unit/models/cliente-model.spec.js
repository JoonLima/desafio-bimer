import ClienteModel from '@/models/cliente-model'

const NOME_PADRAO = 'Teste123'
const CPF_CNPJ_PADRAO = '12345678901'
const EMAIL_PADRAO = 'teste@teste.com'
const TELEFONE_PADRAO = '2122222222'

let clientePadrao = new ClienteModel()
clientePadrao.nome = 'Cliente Padrão'
clientePadrao.cpfOuCnpj = '12398745687'
clientePadrao.email = 'email@email.com'
clientePadrao.telefone = '2127412390'

describe('cliente-model.vue', () => {

    it('Deve retornar falso modelo cliente sem nenhum dado.', () => {
        let clienteModel = new ClienteModel()
        expect(clienteModel.modeloValido()).toBeFalsy();
    })

    it('Deve retornar falso modelo cliente sem nome informado.', () => {
        let clienteModel = new ClienteModel({cpfOuCnpj: CPF_CNPJ_PADRAO, email: EMAIL_PADRAO, telefone: TELEFONE_PADRAO})
        expect(clienteModel.modeloValido()).toBeFalsy();
    })

    it('Deve retornar falso modelo cliente sem CPF / CNPJ informado.', () => {
        let clienteModel = new ClienteModel({nome: NOME_PADRAO, email: EMAIL_PADRAO, telefone: TELEFONE_PADRAO})
        expect(clienteModel.modeloValido()).toBeFalsy();
    })

    it('Deve retornar falso modelo cliente sem E-mail informado.', () => {
        let clienteModel = new ClienteModel({nome: NOME_PADRAO, cpfOuCnpj: CPF_CNPJ_PADRAO, telefone: TELEFONE_PADRAO})
        expect(clienteModel.modeloValido()).toBeFalsy();
    })

    it('Deve retornar falso modelo cliente sem Telefone informado.', () => {
        let clienteModel = new ClienteModel({nome: NOME_PADRAO, cpfOuCnpj: CPF_CNPJ_PADRAO, email: EMAIL_PADRAO})
        expect(clienteModel.modeloValido()).toBeFalsy();
    })

    it('Deve retornar verdadeiro modelo cliente com todos os dados informados.', () => {
        let clienteModel = new ClienteModel(clientePadrao)
        expect(clienteModel.modeloValido()).toBeTruthy();
    })

})