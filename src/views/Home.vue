<template>
  <div class="box">
    <v-flex pt-5>
    <span class="titulo-principal">
        Dashboard
      </span>
      <v-divider></v-divider>

    <grafico :produtos="produtos" :clientes="clientes" />
    </v-flex>
  </div>
</template>

<script>
import produtoService from '@/services/produto-service';
import ProdutoModel from '@/models/produto-model'
import ClienteModel from '@/models/cliente-model'
import Grafico from '@/components/layout/Grafico.vue';
import clienteService from '@/services/cliente-service';


export default {
  name: "Home",

  data() {
    return {
      produtos: [],
      clientes: []
    }
  },

  components: { Grafico },

  methods:{
     obterTodosOsProdutos() {
      produtoService
        .obterTodos()
        .then((res) => {
         this.produtos = res.data.map((p) => new ProdutoModel(p));
        })
        .catch((error) => console.log(error));
    },

    obterTodosOsClientes() {
      clienteService
        .obterTodos()
        .then((res) => {
          this.clientes = res.data.map((c) => new ClienteModel(c));
        })
        .catch((error) => console.log(error));
    },
   
  },

  computed:{
   
  },

  async mounted(){
    this.obterTodosOsProdutos();
    this.obterTodosOsClientes();
  }
};
</script>
