<template>
  <div class="box">
    <div class="titulo">
      <span>Produtos</span>
    </div>
    <div class="cabecalho">
      <v-btn @click="abrirModal" class="text-none" color="#00383e" dark>
        <svg-icon class="icone" type="mdi" :path="iconeAdicionar"></svg-icon>
        <span>Adicionar</span>
        <modal-padrao-produtos
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
        titulo="Produto"
        :listaColunas="colunas"
        :itensTabela="produtos"
      />
    </div>
  </div>
</template>

<script>
import TabelaPadrao from "@/components/layout/TabelaPadrao.vue";
import produtoService from "@/services/produto-service";
import Produto from "@/models/produto-model";
import ModalPadraoProdutos from "@/components/layout/ModalPadraoProdutos.vue";
import { mdiPlus } from "@mdi/js";
import SvgIcon from "@jamescoyle/vue-icon";

export default {
  name: "Produtos",
  components: {
    TabelaPadrao,
    ModalPadraoProdutos,
    SvgIcon,
  },
  data() {
    return {
      colunas: [
        { text: "Código", value: "id" },
        { text: "Nome", value: "nome" },
        { text: "Valor", value: "valor" },
        { text: "Quantidade", value: "quantidadeEstoque" },
        { text: "Observação", value: "observacao" },
        { text: "Data cadastro", value: "dataCadastro" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      search: "",
      produtos: [],
      exibirJanela: false,
      modoEdicao: false,
      iconeAdicionar: mdiPlus,
    };
  },

  methods: {
    obterTodosOsProdutos() {
      produtoService
        .obterTodos()
        .then((res) => {
          this.produtos = res.data.map((p) => new Produto(p));
        })
        .catch((error) => console.log(error));
    },

    editar(produto) {
      alert(produto.id);
    },

    abrirModal() {
      this.exibirJanela = true;
    },
  },

  mounted() {
    this.obterTodosOsProdutos();
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