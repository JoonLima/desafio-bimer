<template>
  <v-app>
    <nav-bar-2>
      <v-main>
      <router-view />
    </v-main>
    </nav-bar-2>
    <!-- <nav-bar v-if="this.$route.name != 'login'" /> -->
  </v-app>
</template>

<script>
import NavBar from "@/components/layout/NavBar.vue";
import NavBar2 from '@/components/layout/NavBar2.vue';

export default {
  name: "App",

  data: () => ({
    //
  }),

  components: {
    NavBar,
    NavBar2
  },
};
</script>


<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap");

* {
  font-family: "Roboto", sans-serif;
  margin: 0;
  padding: 0;
}

.box {
  padding: 0 2rem;
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
</style>