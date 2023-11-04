import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Clientes from "@/views/Clientes.vue";
import Produtos from "@/views/Produtos.vue";
import Login from "@/views/Login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/clientes",
    name: "clientes",
    component: Clientes,
  },
  {
    path: "/produtos",
    name: "produtos",
    component: Produtos,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
