<template>
  <v-card>
    <v-card-title>
      <v-btn class="text-none btn-adicionar" color="#00383e">
        <svg-icon class="icone" type="mdi" :path="path"></svg-icon>
        <span>Adicionar</span>
      </v-btn>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Pesquisar"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
      no-data-text="Sem dados para serem exibidos."
      height="200px"
    ></v-data-table>
  </v-card>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiPlus } from "@mdi/js";

export default {
  props: {
    titulo: { type: String, required: false, default: "" },
    listaColunas: { type: Array, required: true, default: undefined },
  },

  data() {
    return {
      search: "",
      headers: this.listaColunas,
      path: mdiPlus,
    };
  },

  components: {
    SvgIcon,
  },
};
</script>

<style scoped>
.btn-adicionar {
  color: #fff;
}

.icone {
  margin-right: 0.2rem;
}
</style>