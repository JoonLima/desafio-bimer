<template>
  <v-app>
    <nav-bar v-if="this.$route.name != 'login'"></nav-bar>
      <v-main>
      <router-view />
    </v-main>
    
    
  </v-app>
</template>

<script>
import NavBar from "@/components/layout/NavBar.vue";

export default {
  name: "App",

  data: () => ({
    //
  }),

  components: {
    NavBar,
  },
};
</script>


<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap");

* {
  font-family: "Roboto", sans-serif;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.box {
  padding-left: 5rem ;
}

#app {
  background-color: rgb(240, 240, 240);
}

.btn-padrao {
  color: #fff;
}

.box .cabecalho {
  display: flex;
  margin-top: 1rem;
}

.box .titulo-principal{
  font-size: 1.5rem;
}

.box .btn-adicionar{
  margin-bottom: 2rem;
  margin-top: 2rem;
}
</style>