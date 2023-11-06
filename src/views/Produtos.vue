<template>
  <div class="box">
    <div class="titulo">
      <span>Produtos</span>
    </div>
    <div class="cabecalho">
      <model-produto @produtoAdicionado="obterTodosOsProdutos" />
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
        :itensTabela="produtos"
      />
    </div>
  </div>
</template>

<script>
import TabelaPadrao from "@/components/layout/TabelaPadrao.vue";
import ModelProduto from "@/components/layout/ModelProduto.vue";
import produtoService from "@/services/produto-service";
import Produto from "@/models/produto-model";

export default {
  name: "Produtos",
  components: {
    TabelaPadrao,
    ModelProduto,
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
      ],
      search: "",
      produtos: [],
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
</style>