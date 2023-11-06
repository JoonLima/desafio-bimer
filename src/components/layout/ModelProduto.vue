<template>
  <v-row class="margin-button">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="text-none" color="#00383e" dark v-bind="attrs" v-on="on">
          <svg-icon class="icone" type="mdi" :path="path"></svg-icon>
          <span>Adicionar</span>
        </v-btn>
      </template>
      <v-card>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="3">
                <v-text-field
                  disabled
                  label="Codigo"
                  type="text"
                ></v-text-field>
              </v-col>
              <v-col cols="9">
                <v-text-field
                  label="Nome"
                  required
                  v-model="produto.nome"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  prefix="R$"
                  label="Valor"
                  type="text"
                  v-model="produto.valor"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  label="Quantidade"
                  type="text"
                  v-model="produto.quantidadeEstoque"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  name="input-7-1"
                  rows="1"
                  label="Observação"
                  v-model="produto.observacao"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#00383e" @click="cadastrar">
            <span class="span-gravar">Gravar</span>
          </v-btn>
          <v-btn color="#00383e" outlined @click="cancelarItem">
            <span>Cancelar</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiPlus } from "@mdi/js";
import Produto from "@/models/produto-model";
import produtoService from "@/services/produto-service";

export default {
  data() {
    return {
      dialog: false,
      path: mdiPlus,
      produto: new Produto(),
    };
  },

  methods: {
    cadastrar() {
      if (!this.produto.modeloValido()) {
        console.log("Modelo inválido para cadastro.");
      }

      produtoService
        .cadastrar(this.produto)
        .then(() => {
          console.log(this.produto);
          this.produto = new Produto();
          this.dialog = false;
          this.$emit("produtoAdicionado");
        })
        .catch((error) => console.log(error));
    },

    salvarItem() {
      console.log("oi");
    },

    cancelarItem() {
      this.dialog = false;
      this.produto = new Produto();
    },
  },

  components: {
    SvgIcon,
  },
};
</script>

<style scoped>
.margin-button {
  padding-top: 1rem;
  margin: 0;
}

.icone {
  margin-right: 0.2rem;
}

.span-gravar {
  color: #fff;
}
</style>