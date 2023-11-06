import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Clientes from "@/views/Clientes.vue";
import Produtos from "@/views/Produtos.vue";
import Login from "@/views/Login.vue";
import storageService from "@/util/storageService";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: { requiredAuth: true },
  },
  {
    path: "/clientes",
    name: "clientes",
    component: Clientes,
    meta: { requiredAuth: true },
  },
  {
    path: "/produtos",
    name: "produtos",
    component: Produtos,
    meta: { requiredAuth: true },
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: { requiredAuth: false },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  var token = storageService.obterTokenNaStorage();

  if (to.name == "login") {
    if (token) {
      next({
        path: "/",
        params: { nextUrl: to.fullPath },
      });
    } else {
      next();
    }
  } else if (to.matched.some((rota) => rota.meta.requiredAuth)) {
    if (token == null) {
      next({
        path: "/login",
        params: { nextUrl: to.fullPath },
      });
    } else {
      next();
    }
  }
});

export default router;
