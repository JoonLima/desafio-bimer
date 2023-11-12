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

  methods:{
  }
};
</script>


<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap");

* {
  font-family: "Roboto", sans-serif;
  margin: 0;
  padding: 0;
}

*::-webkit-scrollbar{
  width: 6px;
  height: 6px;
}

*::-webkit-scrollbar-track{
  background-color: #FFF;
}

*::-webkit-scrollbar-thumb{
  background-color: #165091;
  border: 1px solid #fff;
  border-radius: 50px;
}

.box {
  padding-left: 5rem;
  padding-right: 2rem;
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