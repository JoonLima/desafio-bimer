<template>
  <v-card>
    <v-card-title>
      <v-spacer></v-spacer>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :search="search"
      no-data-text="Sem dados para serem exibidos."
      height="200px"
    ></v-data-table>
  </v-card>
</template>

<script>
export default {
  props: {
    titulo: { type: String, required: false, default: "" },
    listaColunas: { type: Array, required: true, default: undefined },
    search: { type: String, required: false, default: "" },
  },

  data() {
    return {
      headers: this.listaColunas,
      searchPadrao: this.search,
    };
  },

  components: {},
};
</script>

<style scoped>
.btn-adicionar {
  color: #fff;
}
</style>