import UsuarioModel from '@/models/usuario-model'

const EMAIL_PADRAO = 'email@email.com'
const SENHA_PADRAO = 123456

let usuarioPadrao = new UsuarioModel()
usuarioPadrao.email = 'usuario@email.com'
usuarioPadrao.senha = 123456

describe('usuario-model.vue', () => {

    it('Deve retornar falso modelo usuario sem nenhum dado.', () => {
        let usuarioModel = new UsuarioModel()
        expect(usuarioModel.modeloValidoLogin()).toBeFalsy();
    })

    it('Deve retornar falso modelo usuario sem email informado.', () => {
        let usuarioModel = new UsuarioModel({senha: SENHA_PADRAO})
        expect(usuarioModel.modeloValidoLogin()).toBeFalsy();
    })

    it('Deve retornar falso modelo usuario sem senha informada.', () => {
        let usuarioModel = new UsuarioModel({email: EMAIL_PADRAO})
        expect(usuarioModel.modeloValidoLogin()).toBeFalsy();
    })

    it('Deve retornar verdadeiro modelo usuario completo.', () => {
        let usuarioModel = new UsuarioModel(usuarioPadrao)
        expect(usuarioModel.modeloValidoLogin()).toBeTruthy();
    })

})