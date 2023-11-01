<template>
  <v-app>
    <nav-bar />
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import NavBar from '@/components/layout/NavBar.vue'


export default {
  name: 'App',

  data: () => ({
    //
  }),

  components: {
      NavBar
    },
};
</script>


<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap');

*{
  font-family: 'Roboto', sans-serif;
  margin: 0;
  padding: 0;
}

.container{
  padding: 0 2rem;
}

#app{
  background-color: rgb(240, 240, 240);
}

</style>