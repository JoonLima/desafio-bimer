<template>
  <div class="container">
    <div class="titulo">
      <span>Clientes</span>
      <hr />
    </div>
    <div class="tabela">
      <tabela-padrao titulo="Clientes" :listaColunas="colunas" />
    </div>
  </div>
</template>

<script>
import TabelaPadrao from "@/components/layout/TabelaPadrao.vue";

export default {
  name: "Clientes",
  components: {
    TabelaPadrao,
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
  font-size: 20px;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.555);
}
</style>