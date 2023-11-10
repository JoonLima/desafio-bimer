<template>
  <div class="box">
    <v-flex pt-10>
      <span class="titulo-principal">
        Produtos
      </span>
      <v-divider></v-divider>
      <v-btn class="text-none btn-adicionar" color="primary" @click="adicionarProduto()">
        <v-icon>mdi-plus</v-icon> Adicionar
      </v-btn>

        <v-data-table
          :headers="colunas"
          :search="search"
          :items="produtos"
          no-data-text="Sem dados para serem exibidos."
        >

          <template v-slot:[`item.valor`]="{ item }">
            {{ item.valor | valorFormatado }}
          </template>

          <template v-slot:[`item.dataCadastro`]="{ item }">
            {{ item.dataCadastro | dataFormatada }}
          </template>

          <template v-slot:[`item.actions`]="{ item }">
            <v-btn icon color="icone" @click="editarProduto(item)">
              <v-icon> mdi-pencil-outline  </v-icon>
            </v-btn>

            <v-btn icon color="#00383e" @click="excluirProduto(item)">
              <v-icon> mdi-delete-outline </v-icon>
            </v-btn>
          </template>
        </v-data-table>

        <modal-padrao 
          titulo="Produto" 
          v-model="exibirJanela" 
          :acaoBotaoPrimario="salvar" 
          :acaoBotaoSecundario="cancelarCadastro">
          <v-flex xs12 d-flex flex-wrap pt-3>
          <v-flex d-flex xs12 md2 pr-md-2 >
            <v-text-field
              disabled
              label="Codigo"
              type="text"
              dense
              v-model="produto.id"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 md10 pl-md-2>
            <v-text-field
              dense
              label="Nome"
              type="text"
              v-model="produto.nome"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 md6 pr-md-2 pt-4>
            <v-text-field
              dense
              label="Valor"
              type="text"
              v-model="produto.valor"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 md6 pl-md-2 pt-4>
            <v-text-field
              dense
              label="Quantidade"
              type="text"
              v-model="produto.quantidadeEstoque"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 md12 pt-4>
            <v-text-field
              dense
              label="Observação"
              type="text"
              v-model="produto.observacao"
            ></v-text-field>
          </v-flex>
        </v-flex>
        </modal-padrao>
    </v-flex>
  </div>
</template>

<script>
import produtoService from "@/services/produto-service";
import ProdutoModel from '@/models/produto-model'
import ModalPadrao from '@/components/layout/ModalPadrao.vue'
import formatador from "@/util/formatador";


export default {
  name: "Produtos",
  components: {
    ModalPadrao
  },
  data() {
    return {
      colunas: [
        { text: "Código", value: "id" },
        { text: "Nome", value: "nome" },
        { text: "Valor", value: "valor" },
        { text: "Quantidade", value: "quantidadeEstoque" },
        { text: "Observação", value: "observacao" },
        { text: "Data cadastro", value: "dataCadastro" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      search: "",
      produtos: [],
      produto: new ProdutoModel(),
      exibirJanela: false,
      modoEdicao: false,
    };
  },

  methods: {
    obterTodosOsProdutos() {
      produtoService
        .obterTodos()
        .then((res) => {
          this.produtos = res.data.map((p) => new ProdutoModel(p));
        })
        .catch((error) => console.log(error));
    },

     adicionarProduto(){
      this.cliente = new ProdutoModel();
      this.exibirJanela = true;
    },

    salvar(){
      if(!this.modoEdicao){
        this.salvarCadastro();
      } else {
        this.salvarEdicao();
      }
    },

    salvarCadastro(){
      if(!this.produto.modeloValido()){
        this.$swal({
          icon: "error",
          title: "Campos obrigatórios",
          html: `- Nome<br>
                 - Quantidade `,
          confirmButtonColor: "#165091",
        });
        return
      }

      produtoService.cadastrar(this.produto)
      .then(() => {
        this.$swal({
          icon: "success",
          title: "Produto cadastrado.",
          showConfirmButton: false,
          timer: 1500
        });

        this.produto = new ProdutoModel();
        this.obterTodosOsProdutos();
        this.exibirJanela = false;
      })
      .catch(error => {
        this.$swal({
          icon: "error",
          title: "Erro ao cadastrar cliente",
          text: `${error}`,
          confirmButtonColor: "#165091",
        });
      })
    },

    salvarEdicao(){
      if(!this.produto.modeloValido()){
        this.$swal({
          icon: "error",
          title: "Campos obrigatórios",
          html: `- Nome<br>
                 - Quantidade `,
          confirmButtonColor: "#165091",
        });
        return
      }

      produtoService.atualizar(this.produto)
      .then(() => {
        this.$swal({
          icon: "success",
          title: "Produto atualizado.",
          showConfirmButton: false,
          timer: 1500
        });

        this.produto = new ProdutoModel();
        this.obterTodosOsProdutos();
        this.exibirJanela = false;
      })
      .catch(error => {
        this.$swal({
          icon: "error",
          title: "Erro ao atualizar cliente",
          text: `${error}`,
          confirmButtonColor: "#165091",
        });
      })
    },

    cancelarCadastro(){
      this.exibirJanela = false;
    },

     editarProduto(item){
      this.modoEdicao = true;
      this.produto = new ProdutoModel(item)
      this.exibirJanela = true;
    },

    excluirProduto(item){
      this.$swal({
        title: "Deseja excluir este produto?",
        text: `${item.id} - ${item.nome}`,
        showCancelButton: true,
        confirmButtonColor: "#165091",
        confirmButtonText: "Sim",
        cancelButtonText: "Não"
      }).then((result) => {
        if (result.isConfirmed) {
          produtoService.deletar(item.id)
          .then(() => {
            this.produto = new ProdutoModel();
            this.obterTodosOsProdutos();
          })
          .catch(error => {
            this.$swal({
            icon: "error",
            title: "Erro ao excluir produto",
            text: `${error}`,
            confirmButtonColor: "#165091",
        });
          })
        }
      })
    }

  },

  filters:{
    valorFormatado(valor){
      return formatador.formatarEmReal(valor)
    },

    dataFormatada(data){
      return formatador.formatarData(data)
    }
  },

  mounted() {
    this.obterTodosOsProdutos();
  },
};
</script>

<style scoped>
.tabela {
  margin-top: 2rem;
}

.titulo {
  margin-top: 1.5rem;
}

.titulo span {
  font-size: 18px;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.555);
}

.box .cabecalho {
  display: flex;
  align-items: center;
}

.box .btn-adicionar{
  margin-bottom: 2rem;
}
</style>