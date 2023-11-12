<template>
  <div class="box-grafico">

        <div class="grafico-quantidades">
            <span class="titulo-grafico">
                Produtos com maior estoque
            </span>
            <canvas id="graficoQuantidade"></canvas>    
        </div>
        <div class="grafico-produto-cliente">
            <span class="titulo-grafico">
                Quantidade Cliente x Produto
            </span>
            <canvas id="graficoProdutoCliente"></canvas>    
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
                            label: "Quantidade",
                            backgroundColor: '#165091',
                            data: quantidades,
                            fill: false,
                            barPercentage: 0.3,
                            barThickness: 6,
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

                const config = {
                    type: 'doughnut',
                    data: {
                        labels: ['Produtos', 'Clientes'],
                        datasets: [{
                            label: "Quantidade",
                             backgroundColor: [
                                '#165091',
                                'rgb(54, 162, 235)',
                            ],
                            data: [quantidadeProdutos, quantidadeClientes],
                            hoverOffset: 4,
                            borderRadius: 10,
                            borderWidth: 3,
                            
                        }]
                    },
                    options: this.opcoesGraficoProdutosClientes
                };

                const context = document.getElementById('graficoProdutoCliente').getContext('2d');
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
    margin-top: 2rem;
    display: flex;
    width: 100%;
    
}

@media (max-width: 1260px) {
    .box-grafico {
        flex-direction: column;
        margin-top: 1rem;
    }

    .box-grafico .grafico-produto-cliente .titulo-grafico{
        margin-top: 5rem;
    }
   
}

.box-grafico .grafico-produto-cliente{
    width: 100%;
    margin: 0 auto;
    height: 400px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.box-grafico .grafico-quantidades{
    width: 100%;
    margin: 0 auto;
    height: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.box-grafico .titulo-grafico{
    font-weight: 500;
    margin-bottom: 1rem;
}

</style>