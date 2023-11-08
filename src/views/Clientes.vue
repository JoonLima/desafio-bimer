<template>
  <div class="box">
    <v-flex>
        <v-btn @click="adicionarCliente()">Adicionar</v-btn>

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
          <v-btn icon color="#00383e" @click="editarCliente(item)">
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
          :acaoBotaoPrimario="salvarCadastro" 
          :acaoBotaoSecundario="cancelarCadastro">
          <v-flex style="border: 1px solid red" xs12 d-flex flex-wrap>
          <v-flex d-flex xs12 md2 pr-md-2>
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
              outlined
              label="Nome"
              type="text"
              v-model="cliente.nome"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 md6 pr-md-2>
            <v-text-field
              outlined
              dense
              label="CPF / CNPJ"
              type="text"
              v-model="cliente.cpfOuCnpj"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 md6 pl-md-2>
            <v-text-field
              outlined
              dense
              label="Telefone"
              type="text"
              v-model="cliente.telefone"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 md8>
            <v-text-field
              outlined
              dense
              label="E-mail"
              type="text"
              v-model="cliente.email"
            ></v-text-field>
          </v-flex>
        </v-flex>
          <!-- <v-row>
          <v-col cols="2">
            <v-text-field
              disabled
              label="Codigo"
              type="text"
              dense
              v-model="cliente.id"
            ></v-text-field>
          </v-col>
          <v-col cols="10">
            <v-text-field
              dense
              outlined
              label="Nome"
              type="text"
              v-model="cliente.nome"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              outlined
              dense
              label="CPF / CNPJ"
              type="text"
              v-model="cliente.cpfOuCnpj"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              outlined
              dense
              label="Telefone"
              type="text"
              v-model="cliente.telefone"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              outlined
              dense
              label="E-mail"
              type="text"
              v-model="cliente.email"
            ></v-text-field>
          </v-col>
        </v-row> -->
        </modal-padrao>

    </v-flex>
    <!-- <div class="titulo">
      <span>Clientes</span>
    </div>
    <div class="cabecalho">
      <v-btn @click="abrirModal" class="text-none" color="#00383e" dark>
        <svg-icon class="icone" type="mdi" :path="iconeAdicionar"></svg-icon>
        <span>Adicionar</span>
        <modal-padrao-clientes
          :exibirJanela="exibirJanela"
          :modoEdicao="modoEdicao"
          @fecharModal="exibirJanela = $event"
        />
      </v-btn>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Pesquisar"
        single-line
        hide-details
      ></v-text-field>
    </div>
    <div class="tabela">
      <tabela-padrao
        :search="search"
        titulo="Clientes"
        :listaColunas="colunas"
        :itensTabela="clientes"
      />
    </div> -->
  </div>
</template>

<script>
import TabelaPadrao from "@/components/layout/TabelaPadrao.vue";
import clienteService from "@/services/cliente-service";
import ClienteModel from "@/models/cliente-model";
import { mdiPlus, mdiPencilOutline, mdiDeleteOutline } from "@mdi/js";
import SvgIcon from "@jamescoyle/vue-icon";
import ModalPadrao from '@/components/layout/ModalPadrao.vue'
import formatador from "@/util/formatador";

export default {
  name: "Clientes",
  components: {
    TabelaPadrao,
    SvgIcon,
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
      exibirJanela: false,
      modoEdicao: false,
      modoCliente: false,
      iconeAdicionar: mdiPlus,
      iconeEditar: mdiPencilOutline,
      iconeDeletar: mdiDeleteOutline,
      cliente: new ClienteModel()
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

    salvarCadastro(){
      //validar campos obrigatórios

      this.exibirJanela = false;
    },

    cancelarCadastro(){
      this.exibirJanela = false;
    },

    editarCliente(item){
      this.cliente = new ClienteModel(item);
      this.exibirJanela = true;
    },

    excluirCliente(item){

    }
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