<template>
  <div class="box">
    <v-flex pt-10>
      <span class="titulo-principal">
        Clientes
      </span>
      <v-divider></v-divider>
        <v-btn class="text-none btn-adicionar" color="primary" @click="adicionarCliente()">
          <v-icon>mdi-plus</v-icon> Adicionar
        </v-btn>

        <v-data-table
          :headers="colunas"
          :search="search"
          :items="clientes"
          no-data-text="Sem dados para serem exibidos."
        >

          <template v-slot:[`item.dataCadastro`]="{ item }">
            {{ item.dataCadastro | dataFormatada }}
          </template>

          <template v-slot:[`item.actions`]="{ item }">
            <v-btn icon color="icone" @click="editarCliente(item)">
              <v-icon> mdi-pencil-outline  </v-icon>
            </v-btn>

            <v-btn icon color="#00383e" @click="excluirCliente(item)">
              <v-icon> mdi-delete-outline </v-icon>
            </v-btn>
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
              type="text"
              v-model="cliente.cpfOuCnpj"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 md6 pl-md-2 pt-4>
            <v-text-field
              dense
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

export default {
  name: "Clientes",
  components: {
    ModalPadrao
  },

  data() {
    return {
      colunas: [
        { text: "Código", value: "id" },
        { text: "Nome", value: "nome" },
        { text: "CPF / CNPJ", value: "cpfOuCnpj" },
        { text: "E-mail", value: "email" },
        { text: "Telefone", value: "telefone" },
        { text: "Data cadastro", value: "dataCadastro" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      search: "",
      clientes: [],
      cliente: new ClienteModel(),
      exibirJanela: false,
      modoEdicao: false,
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
  },

  filters:{
    dataFormatada(data){
      return formatador.formatarData(data)
    }
  },

  mounted() {
    this.obterTodosOsClientes();
  },
};
</script>

<style scoped>
.tabela {
  margin-top: 2rem;
}

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
  align-items: center;
}


</style>