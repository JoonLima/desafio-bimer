<template>
 <v-card>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="mini"
      permanent
      height="100vh"
      fixed
      color="primary"
    >
      <v-list-item class="px-2">
        <v-btn icon @click.stop="menu">
          <v-icon v-if="mini" size="32" color="#fff">mdi-menu</v-icon>
          <v-icon v-else size="32" color="#fff">mdi-close</v-icon>
        </v-btn>

      </v-list-item>

      <v-divider></v-divider>

      <v-list>

        <div class="usuario">
          <v-list-item-avatar>
            <v-img :src="obterFotoUsuario"></v-img>
          </v-list-item-avatar>

          <v-list-item-title>{{obterNomeUsuario}}</v-list-item-title>
        </div>

        <v-divider ></v-divider>

        <router-link active-class="ativo" exact to="/">
          <v-list-item @click="menu" link dark>
            <v-list-item-icon>
              <v-icon>mdi-view-dashboard-outline</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title >Dashboard</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>

        <router-link active-class="ativo" exact to="/clientes">
          <v-list-item @click="menu" link dark>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title >Clientes</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>

        <router-link active-class="ativo" exact to="/produtos">
          <v-list-item @click="menu" link dark>
            <v-list-item-icon>
              <v-icon>mdi-package-variant-closed</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Produtos</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>

        <router-link class="botao-logout" active-class="ativo" exact to="/produtos">
          <v-list-item @click="logout" link dark>
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Sair</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
       
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
import usuarioService from '@/services/usuario-service';
import storageService from '@/util/storageService';

  export default {
    data: () => ({
      drawer: true,
      mini: true,
    }),

    methods:{
        menu(){ 
          this.mini = !this.mini
        },

        logout(){
        usuarioService.logout()
        .then(() => {
          storageService.removerUsuarioNaStorage();
          storageService.removerTokenNaStorage();
          this.$router.push({path: '/login'});
        })
        .catch(error => {
          this.$swal({
            icon: "error",
            title: "Erro ao realizar logout.",
            text: `${error}`,
            confirmButtonColor: "#165091",
          });
        })
      },

      fecharMenu(){
        this.mini = true
        this.drawer = !this.drawer
      }
     
    },

    computed:{
      obterNomeUsuario(){
        let usuario = storageService.obterUsuarioNaStorage()
        return usuario.nome
      },

      obterFotoUsuario(){
        let usuario = storageService.obterUsuarioNaStorage()
        return usuario.foto
      }
    },
    watch: {
      group () {
        this.drawer = false
      },
    },
    
  }
</script>

<style scoped>

.menu{
  display: flex;
  flex-direction: column;
  
  padding-top: 2rem;
}

.menu a{
  text-decoration: none;
  color: #fff;
  display: flex;
  padding: 1.2rem 1rem;
  border-radius: 10px;
}

.menu a:hover{
  background-color: #7BC6FF;
}

.menu a span{
  font-size: 1.2rem;
  padding-left: 1rem;
}

.menu-hamburguer{
  position: relative;
}

.usuario {
  display: flex;
  padding-left: .5rem;
  padding-bottom: .5rem;
  color: #fff;
}

.list-item{
  overflow: hidden;
}

.botao-logout{
  bottom: 0;
  position: absolute;
  width: 100%;
}

</style>