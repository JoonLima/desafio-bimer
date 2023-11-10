<template>
  <div class="container">
    <canvas id="myChart"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js/auto'
import produtoService from '@/services/produto-service';
import ProdutoModel from '@/models/produto-model'


export default {
  name: "Home",

  data() {
    return {
      nomes: [],
      quantidade:[]
    }
  },

  components: {  },

  methods:{
     obterTodosOsProdutos() {
      produtoService
        .obterTodos()
        .then((res) => {
         let todosOsProdutos = res.data.map((p) => new ProdutoModel(p));
         this.produtos = todosOsProdutos.sort((a, b) => {
          if(a.quantidadeEstoque > b.quantidadeEstoque){
            return -1 
          } else {
            return true
          }
         })

          this.nomes = this.produtos.map(x => x.nome)
          console.log(this.nomes)
          this.quantidade = this.produtos.map(x => x.quantidadeEstoque)
          console.log(this.quantidade)

        })
        .catch((error) => console.log(error));
    },
   
  },

  computed:{
    obterNomes(){
      let nomes = this.produtos.map(x => x.nome)
      return nomes
    }
  },

  async mounted(){
    this.obterTodosOsProdutos();

    const data = {
      labels: this.nomes,
       datasets:[{
        label: 'Produtos com mais estoque',
        data: this.quantidade
       }]
    }

    const config= {
      type: 'bar',
      data: data,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    }

    const ctx = document.getElementById('myChart');
    const myChart = new Chart(ctx, config);

    myChart;
  }
};
</script>
