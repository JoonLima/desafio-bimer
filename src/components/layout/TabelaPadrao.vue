<template>
  <v-card>
    <v-card-title>
      <v-spacer></v-spacer>
    </v-card-title>
    <v-data-table
      :headers="listaColunas"
      :search="search"
      :items="itensTabela"
      no-data-text="Sem dados para serem exibidos."
    ></v-data-table>
  </v-card>
</template>

<script>
export default {
  props: {
    titulo: { type: String, required: false, default: "" },
    listaColunas: { type: Array, required: true, default: undefined },
    itensTabela: { type: Array, required: true, default: undefined },
    search: { type: String, required: false, default: "" },
  },

  data() {
    return {};
  },

  components: {},
};
</script>

<style scoped>
.btn-adicionar {
  color: #fff;
}
</style>