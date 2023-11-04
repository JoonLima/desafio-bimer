<template>
  <div class="box">
    <div class="titulo">
      <span>Clientes</span>
    </div>
    <div class="cabecalho">
      <model-cliente />
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
      />
    </div>
  </div>
</template>

<script>
import TabelaPadrao from "@/components/layout/TabelaPadrao.vue";
import ModelCliente from "@/components/layout/ModelCliente.vue";

export default {
  name: "Clientes",
  data() {
    return {
      search: "",
    };
  },
  components: {
    TabelaPadrao,
    ModelCliente,
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
      ],
      search: "",
    };
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