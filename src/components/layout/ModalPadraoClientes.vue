<template>
  <v-dialog
    v-model="exibirJanela"
    max-width="60%"
    persistent
    :retain-focus="false"
  >
    <v-card>
      <v-card-title> {{ modoEdicao ? "Edição" : "Novo" }} </v-card-title>

      <v-card-text>
        <v-row>
          <v-col cols="2">
            <v-text-field
              disabled
              label="Codigo"
              type="text"
              dense
              v-model="cliente.id"
            ></v-text-field>
          </v-col>
          <v-col cols="10">
            <v-text-field
              dense
              outlined
              label="Nome"
              type="text"
              v-model="cliente.nome"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              outlined
              dense
              label="CPF / CNPJ"
              type="text"
              v-model="cliente.cpfOuCnpj"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              outlined
              dense
              label="Telefone"
              type="text"
              v-model="cliente.telefone"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              outlined
              dense
              label="E-mail"
              type="text"
              v-model="cliente.email"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>

      <v-card-actions class="justify-end">
        <v-btn class="text-none" color="#00383e" dark @click="salvar"
          >Salvar</v-btn
        >

        <v-btn class="text-none" @click="fecharModal">Cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
import Cliente from "@/models/cliente-model";
import clienteService from "@/services/cliente-service";

export default {
  props: {
    exibirJanela: { type: Boolean, required: true, default: false },
    modoEdicao: { type: Boolean, required: false, default: false },
    cliente: {
      type: Object,
      required: false,
      default: () => new Cliente(),
    },
  },

  methods: {
    fecharModal() {
      this.$emit("fecharModal", false);
    },

    salvar() {
      if (!this.modoEdicao) {
        this.cadastrar(this.cliente);
      } else {
        this.editar(this.cliente);
      }
    },

    cadastrar(cliente) {
      alert(cliente);
    },

    editar() {
      console.log("editar");
    },
  },
};
</script>