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
          <v-btn color="transparent" dark v-bind="attrs" v-on="on">
            <i class="bx bxs-user-circle"></i>
            Jonathan
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title>
              <v-btn block>Sair</v-btn>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      offset: true,
    };
  },
};
</script>

<style scoped>
.menu {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
  background-color: #00383e;
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
  border-bottom: 4px solid #cfe1ef;
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
  color: #cfe1ef;
  border-bottom: 4px solid #cfe1ef;
}
</style>