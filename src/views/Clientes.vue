<template>
  <div class="box">
    <v-flex>
      <div class="cabecalho">
      <span class="titulo-principal">
        Clientes
      </span>
      <tema-vue />
      </div>
      <v-divider></v-divider>
        <v-btn class="text-none btn-adicionar" color="primary" @click="adicionarCliente()">
          <v-icon>mdi-plus</v-icon> Adicionar
        </v-btn>

        <v-data-table
          :headers="colunas"
          :items="clientes"
          :hide-default-header="tamanhoMobile"
          no-data-text="Sem dados para serem exibidos."
        >

        <template v-slot:[`item.dataCadastro`]="{ item }">
            {{ item.dataCadastro | dataFormatada }}
          </template>

          <template v-slot:[`item.cpfOuCnpj`]="{ item }">
            {{ item.cpfOuCnpj | cpfCnpjFormatado }}
          </template>

          <template v-slot:[`item.actions`]="{ item }">
            <v-btn icon color="icone" @click="editarCliente(item)">
              <v-icon> mdi-pencil-outline  </v-icon>
            </v-btn>

            <v-btn icon color="icone" @click="excluirCliente(item)">
              <v-icon> mdi-delete-outline </v-icon>
            </v-btn>
          </template>

          <template v-if="tamanhoMobile" v-slot:[`item`]="{ item }">
            <td class="linha-mobile">
              <div class="linha-dados-mobile">
                <div :class="{'mobile': tamanhoMobile}">
                  <div class="conteudo">
                    <span>Nome</span>
                    {{ item.nome }}
                  </div>
                  </div>
                  <div :class="{'mobile': tamanhoMobile}">
                    <div class="conteudo">
                      <span>CPF / CNPJ</span>
                      {{ item.cpfOuCnpj | cpfCnpjFormatado}}
                    </div>
                    <div class="conteudo">
                      <span>Telefone</span>
                      {{ item.telefone }}
                    </div>
                  </div>
                  <div :class="{'mobile': tamanhoMobile}">
                    <div class="conteudo">
                      <span>E-mail</span>
                      {{ item.email }}
                    </div>
                  </div>
                  <div :class="{'mobile': tamanhoMobile}">
                    <div class="conteudo">
                      <span>Data cadastro</span>
                      {{ item.dataCadastro | dataFormatada }}
                    </div>
                    <div class="botoes-mobile">
                      <v-btn icon color="icone" @click="editarCliente(item)">
                        <v-icon> mdi-pencil-outline  </v-icon>
                      </v-btn>

                      <v-btn icon color="icone" @click="excluirCliente(item)">
                        <v-icon> mdi-delete-outline </v-icon>
                      </v-btn>
                    </div>
                </div>
              </div>
                
              
            </td>    
            <hr>      
          </template>          
        </v-data-table>

        <modal-padrao 
          titulo="Cliente" 
          v-model="exibirJanela" 
          :acaoBotaoPrimario="salvar" 
          :acaoBotaoSecundario="cancelarCadastro">
          <v-flex xs12 d-flex flex-wrap pt-3>
          <v-flex d-flex xs12 md2 pr-md-2 >
            <v-text-field
              disabled
              label="Codigo"
              type="text"
              dense
              v-model="cliente.id"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 md10 pl-md-2>
            <v-text-field
              dense
              label="Nome"
              type="text"
              v-model="cliente.nome"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 md6 pr-md-2 pt-4>
            <v-text-field
              dense
              label="CPF / CNPJ"
              counter='14'
              maxlength="14"
              :rules="regrasCPFCNPJ"
              type="text"
              v-model="cliente.cpfOuCnpj"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 md6 pl-md-2 pt-4>
            <v-text-field
              dense
              class="input-number"
              label="Telefone"
              type="text"
              v-model="cliente.telefone"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 md12 pt-4>
            <v-text-field
              dense
              label="E-mail"
              type="text"
              :rules="regrasEmail"
              v-model="cliente.email"
            ></v-text-field>
          </v-flex>
        </v-flex>
        </modal-padrao>
    </v-flex>
    
  </div>
</template>

<script>
import clienteService from "@/services/cliente-service";
import ClienteModel from "@/models/cliente-model";
import ModalPadrao from '@/components/layout/ModalPadrao.vue'
import formatador from "@/util/formatador";
import { COLUNAS_TABELA_CLIENTE } from '@/constants/constants.js'
import TemaVue from '@/components/layout/TemaVue.vue';


export default {
  name: "Clientes",
  components: {
    ModalPadrao,
    TemaVue
  },

  data() {
    return {
      colunas: COLUNAS_TABELA_CLIENTE,
      clientes: [],
      cliente: new ClienteModel(),
      exibirJanela: false,
      modoEdicao: false,
      regrasCPFCNPJ: [v => v.length > 10 || 'Formato inválido'],
      regrasEmail: [(v) => /.+@.+\..+/.test(v) || "E-mail inválido",],
    };
  },

  methods: {
    obterTodosOsClientes() {
      clienteService
        .obterTodos()
        .then((res) => {
          this.clientes = res.data.map((c) => new ClienteModel(c));
        })
        .catch((error) => console.log(error));
    },

    adicionarCliente(){
      this.modoEdicao = false;
      this.cliente = new ClienteModel();
      this.exibirJanela = true;
    },

    salvar(){
      if(!this.modoEdicao){
        this.salvarCadastro();
      } else {
        this.salvarEdicao();
      }
    },

    salvarCadastro(){
      
      if(!this.cliente.modeloValido()){
        this.$swal({
          icon: "error",
          title: "Campos obrigatórios",
          html: `- Nome<br>
                 - CPF / CNPJ<br>
                 - E-mail<br>
                 - Telefone `,
          confirmButtonColor: "#165091",
        });
        return
      }

      clienteService.cadastrar(this.cliente)
      .then(() => {
        this.$swal({
          icon: "success",
          title: "Cliente cadastrado.",
          showConfirmButton: false,
          timer: 1500
        });
        this.cliente = new ClienteModel();
        this.obterTodosOsClientes();
        this.exibirJanela = false;
      })
      .catch(error => {
        this.$swal({
          icon: "error",
          title: "Erro ao cadastrar cliente",
          text: `${error}`,
          confirmButtonColor: "#165091",
        });
      })
    },

    salvarEdicao(){
      if(!this.cliente.modeloValido()){
        this.$swal({
          icon: "error",
          title: "Campos obrigatórios",
          html: `- Nome<br>
                 - CPF / CNPJ<br>
                 - E-mail<br>
                 - Telefone `,
          confirmButtonColor: "#165091",
        });
        return
      }

      clienteService.atualizar(this.cliente)
      .then(() => {
        this.$swal({
          icon: "success",
          title: "Cliente atualizado.",
          showConfirmButton: false,
          timer: 1500
        });
        this.cliente = new ClienteModel();
        this.obterTodosOsClientes();
      })
      .catch(error => {
        this.$swal({
          icon: "error",
          title: "Erro ao atualizar cliente",
          text: `${error}`,
          confirmButtonColor: "#165091",
        });
      })

      this.exibirJanela = false;
    },

    cancelarCadastro(){
      this.exibirJanela = false;
    },

    editarCliente(item){
      this.modoEdicao = true;
      this.cliente = new ClienteModel(item);
      this.exibirJanela = true;
    },

    excluirCliente(item){
      this.$swal({
        title: "Deseja excluir este cliente?",
        text: `${item.id} - ${item.nome}`,
        showCancelButton: true,
        confirmButtonColor: "#165091",
        confirmButtonText: "Sim",
        cancelButtonText: "Não"
      }).then((result) => {
        if (result.isConfirmed) {
          clienteService.deletar(item.id)
          .then(() => {
            this.cliente = new ClienteModel();
            this.obterTodosOsClientes();
          })
          .catch(error => {
            this.$swal({
            icon: "error",
            title: "Erro ao excluir cliente",
            text: `${error}`,
            confirmButtonColor: "#165091",
        });
          })
        }
      })
    },

    verificarTeclasDigitadas(e){
      let x = e.which || e.keycode;
      
      if(x >= 48 || x <= 57){
        return true
      } else {
        return false
      }
    }
  },

  filters:{
    dataFormatada(data){
      return formatador.formatarData(data)
    },

    cpfCnpjFormatado(valor){
      return formatador.formatCnpjCpf(valor);
    }
  },

  computed:{
    tamanhoMobile() {
      return this.$vuetify.breakpoint.xsOnly;
    },
  },

  mounted() {
    this.obterTodosOsClientes();
  },
};
</script>

<style scoped>

.titulo {
  margin-top: 1.5rem;
}

.titulo span {
  font-size: 18px;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.555);
}

.box .cabecalho {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;  
}

.mobile{
  display: flex;
  text-align: center;
  justify-content: flex-start;
  gap: 1rem;
  font-size: 15px;
  padding: 5px;
}

.mobile{
  display: flex;
  text-align: center;
  justify-content: flex-start;
  gap: 2rem;
  font-size: 15px;
  padding: 5px;
}

.mobile span{
  color: grey;
  font-size: .8rem;
  display: flex;
  justify-content: flex-start;
}

.conteudo {
  font-size: 13px;
}

.linha-mobile{
  align-items: center;
  min-height: 9rem;
}

.botoes-mobile{
  width: 100%;
  display: flex;
  justify-content: flex-end;
  max-width: 50%;
}

@media (max-width: 600px) {

  .btn-adicionar{
    width: 100%;
  }
}

</style>