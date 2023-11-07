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
    >
      <template v-slot:[`item.actions`]="{ item }">
        <span @click="editarItem(item)">
          <svg-icon type="mdi" :path="iconeEditar"> </svg-icon>
        </span>

        <svg-icon type="mdi" :path="iconeDeletar"></svg-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiPencilOutline, mdiDeleteOutline } from "@mdi/js";
import ModelProduto from "./ModelProduto.vue";

export default {
  props: {
    titulo: { type: String, required: false, default: "" },
    listaColunas: { type: Array, required: true, default: undefined },
    itensTabela: { type: Array, required: true, default: undefined },
    search: { type: String, required: false, default: "" },
    editarItem: { type: Function, required: true, default: () => {} },
  },

  data() {
    return {
      iconeEditar: mdiPencilOutline,
      iconeDeletar: mdiDeleteOutline,
    };
  },

  components: {
    SvgIcon,
    ModelProduto,
  },
};
</script>

<style scoped>
.btn-adicionar {
  color: #fff;
}
</style>