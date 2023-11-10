<template>
  <div class="box-grafico">

        <div class="grafico-quantidades">
            <canvas id="graficoQuantidade"></canvas>    
        </div>
        <div class="grafico-negativos">
            <canvas id="graficoNegativos"></canvas>    
        </div>
    </div>
</template>

<script>
import Chart from 'chart.js/auto';
import { nextTick } from 'vue';

export default {
    name: 'GraficoComponente',
    props:{
        produtos: { type: Array, required: false, default: [] },
        clientes: { type: Array, required: false, default: [] },
        },
    data() {
        return {
        opcoesGrafico: {
            responsive: true,
            indexAxis: 'y',
            title: {
                display: true,
                text: "Produtos com mais estoque",
            },
            tooltips: {
                mode: "index",
                intersect: false,
            },
            hover: {
                mode: "nearest",
                intersect: true,
            },
            scales: {
                y: {
                beginAtZero: true
                }
            },
      },
      opcoesGraficoProdutosClientes: {
            responsive: true,
            indexAxis: 'y',
            title: {
                display: true,
                text: "Quantidade",
            },
            tooltips: {
                mode: "index",
                intersect: false,
            },
            hover: {
                mode: "nearest",
                intersect: true,
            },
      },
        }
    },

    methods:{
        renderizarGraficoQuantidades(){

            setTimeout(() => {
                let produtosOrdenados = [...this.produtos]
                produtosOrdenados.sort((a, b) => b.quantidadeEstoque - a.quantidadeEstoque)

                let nomes = [];
                let quantidades = [];

                produtosOrdenados.forEach(n => {
                    nomes.push(n.nome)
                })

                produtosOrdenados.forEach(n => {
                    quantidades.push(n.quantidadeEstoque)
                })

                const config = {
                    type: 'bar',
                    data: {
                        labels: nomes,
                        datasets: [{
                            label: "Produtos com maior quantidade",
                            backgroundColor: '#165091',
                            data: quantidades,
                            fill: false
                        }]
                    },
                    options: this.opcoesGrafico
                };

                const context = document.getElementById('graficoQuantidade').getContext('2d');
                new Chart(context, config);
            },200)
            
            
        },

        renderizarGraficoProdutoseClientes(){

            setTimeout(() => {
                let quantidadeClientes = this.clientes.length;
                let quantidadeProdutos = this.produtos.length;

                console.log(quantidadeClientes, quantidadeProdutos)

                const config = {
                    type: 'doughnut',
                    data: {
                        labels: ['Produtos', 'Clientes'],
                        datasets: [{
                            label: "Quantidade",
                             backgroundColor: [
                                'rgb(255, 99, 132)',
                                'rgb(54, 162, 235)',
                            ],
                            data: [quantidadeProdutos, quantidadeClientes],
                            hoverOffset: 4
                        }]
                    },
                    options: this.opcoesGraficoProdutosClientes
                };

                const context = document.getElementById('graficoNegativos').getContext('2d');
                new Chart(context, config);
            },200)
            
            
        }
    },

    mounted(){
       nextTick(() =>{
        this.renderizarGraficoQuantidades();
        this.renderizarGraficoProdutoseClientes();
       }) 
    }
    
}
</script>

<style scoped>

.box-grafico{
    border: 1px solid red;
    display: flex;
    justify-content: center;
}

.box-grafico .grafico-quantidades,
.box-grafico .grafico-negativos{
    width: 1200px;
    margin: 0 auto;
    height: 350px;
    padding: 10px;
}

</style>