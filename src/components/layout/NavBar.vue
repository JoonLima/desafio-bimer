<template>
  <nav class="menu">
    <div class="logo"><router-link to="/">DESAFIO</router-link></div>
    <div class="links">
      <router-link active-class="ativo" exact to="/">Dashboard</router-link>
      <router-link active-class="ativo" to="/clientes">Clientes</router-link>
      <router-link active-class="ativo" to="/produtos">Produtos</router-link>
    </div>
    <div class="usuario">
      <v-menu transition="slide-y-transition" bottom :offset-y="offset">
        <template v-slot:activator="{ on, attrs }">
          <v-btn max-width="11rem" color="transparent" dark v-bind="attrs" v-on="on">
            <img class="foto-usuario" :src="obterFotoUsuario" alt="foto-usuario">
            {{obterNomeUsuario}}
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title>
              <v-btn @click="logout" block>Sair</v-btn>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </nav>
</template>

<script>
import usuarioService from '@/services/usuario-service';
import storageService from '@/util/storageService';

export default {
  name: "NavBar",
  data() {
    return {
      offset: true,
    };
  },

  methods:{
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
  }
};
</script>

<style scoped>
.menu {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
  background-color: #165091;
  padding: 0 2rem;
}

.menu .logo a {
  font-weight: bold;
  font-size: 25px;
  color: #fff;
  text-decoration: none;
}

.menu .links a {
  /* margin: 2rem; */
  padding: 1.2rem;
  text-decoration: none;
  color: #fff;
  transition: 0.4s;
  border-bottom: 4px solid transparent;
}

.menu .links a:hover {
  color: #E5E5E5;
  border-bottom: 4px solid #E5E5E5;
}

.menu .usuario {
  color: #fff;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.menu .usuario i {
  font-size: 2rem;
}
.menu .links .ativo {
  color: #E5E5E5;
  border-bottom: 4px solid #E5E5E5;
}

.usuario .foto-usuario {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  margin-right: 5px;
}
</style>