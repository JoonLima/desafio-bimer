<template>
  <v-dialog v-model="exibirJanela" max-width="70%" persistent>
    <v-card>
      <v-card-title> Teste </v-card-title>

      <v-card-text>
        <slot></slot>
      </v-card-text>

      <v-card-actions>
        <v-btn @click="fecharModal">teste</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
export default {
  props: {
    exibirJanela: { type: Boolean, required: true, default: false },
  },

  methods: {
    fecharModal() {
      this.$emit("fecharModal", false);
    },
  },
};
</script>