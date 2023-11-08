<template>
  <v-dialog
    v-model="exibirJanela"
    max-width="60%"
    persistent
    scrollable
    :fullscreen="$vuetify.breakpoint.xsOnly"
    :retain-focus="false"
  >
    <v-card>
      <v-card-title> {{ titulo }} </v-card-title>

      <v-card-text>
        <slot></slot>
      </v-card-text>
      <v-divider></v-divider>

      <v-card-actions class="justify-end">
        <v-btn
          class="text-none"
          color="#00383e"
          dark
          @click="acaoBotaoPrimario()"
        >
          {{ descricaoBotaoPrimario }}
        </v-btn>
        <v-btn class="text-none" @click="acaoBotaoSecundario()">
          {{descricaoBotaoSecundario}}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
export default {
  props: {
    exibirJanela: { type: Boolean, required: true, default: false },
    editando: { type: Boolean, required: false, default: false },
    visualizando: { type: Boolean, required: false, default: false },
    titulo: { type: String, required: false, default: "" },
    acaoBotaoPrimario: { type: Function, required: false, default: () => {} },
    acaoBotaoSecundario: { type: Function, required: false, default: () => {} },
    descricaoBotaoPrimario: {
      type: String,
      required: false,
      default: "Salvar",
    },
    descricaoBotaoSecundario: {
      type: String,
      required: false,
      default: "Cancelar",
    },
  },

  model: {
    prop: "exibirJanela",
    event: "onChange",
  },

  data() {
    return {};
  },

  methods: {
    fecharModal() {
      this.$emit("fecharModal", false);
    },
  },
};
</script>