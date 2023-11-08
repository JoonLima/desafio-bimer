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
        <v-btn icon color="#00383e" @click="exibirModalEdicao(item)">
          <modal-padrao-produtos
            :exibirJanela="modoProduto"
            :modoEdicao="modoEdicao"
            :produtoEditar="item"
            @fecharModal="modoProduto = $event"
          />
          <modal-padrao-clientes
            :exibirJanela="modoCliente"
            :modoEdicao="modoEdicao"
            :cliente="item"
            @fecharModal="modoCliente = $event"
          />
          <svg-icon type="mdi" :path="iconeEditar"> </svg-icon>
        </v-btn>

        <v-btn icon color="#00383e">
          <svg-icon type="mdi" :path="iconeDeletar"></svg-icon>
        </v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiPencilOutline, mdiDeleteOutline } from "@mdi/js";
import ModalPadraoProdutos from "@/components/layout/ModalPadraoProdutos.vue";
import ModalPadraoClientes from "@/components/layout/ModalPadraoClientes.vue";
import Produto from "@/models/produto-model";

export default {
  props: {
    titulo: { type: String, required: false, default: "" },
    listaColunas: { type: Array, required: true, default: undefined },
    itensTabela: { type: Array, required: true, default: undefined },
    search: { type: String, required: false, default: "" },
    produto: { type: Boolean, required: false, default: false },
    exibirJanelaCliente: { type: Function, required: false, default: () => {} },
  },

  data() {
    return {
      iconeEditar: mdiPencilOutline,
      iconeDeletar: mdiDeleteOutline,
      modoCliente: false,
      modoProduto: false,
      modoEdicao: false,
    };
  },

  methods: {
    fecharModal() {
      this.$emit("fecharModal", false);
    },

    exibirModalEdicao(item) {
      if (this.$route.name == "clientes") {
        this.editarCliente(item);
      } else if (this.$route.name == "produtos") {
        this.editarProduto(item);
      }
    },

    editarProduto() {
      this.modoEdicao = true;
      this.modoProduto = true;
    },

    editarCliente() {
      this.modoEdicao = true;
      this.modoCliente = true;
    },
  },

  components: {
    SvgIcon,
    ModalPadraoProdutos,
    ModalPadraoClientes,
  },
};
</script>

<style scoped>
.btn-adicionar {
  color: #fff;
}
</style>