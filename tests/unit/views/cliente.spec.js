import { mount } from "@vue/test-utils";
import Cliente from "@/views/Clientes.vue"


describe('ClienteView.vue', () => {

    let wrapper;

    beforeAll(() => {
        wrapper = mount(Cliente, {
            mocks: {
                $vuetify: { breakpoint: {} }
            }
        })
    })

    it('Deve definir os dados padrão(data()) do componente.', () => {
        const dadosPadrao = Cliente.data()
        expect(dadosPadrao.clientes).toBeDefined();
        expect(dadosPadrao.cliente).toBeDefined();
        expect(dadosPadrao.exibirJanela).toBeFalsy();
        expect(dadosPadrao.modoEdicao).toBeFalsy();
    })
})