<template>
  <v-form>
    <v-container class="box-login">
      <span class="titulo-login"> Login </span>
      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        prepend-icon="mdi-email-outline"
        required
      ></v-text-field>
      <v-text-field
        v-model="senha"
        :rules="senhaRules"
        label="Senha"
        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show ? 'text' : 'password'"
        prepend-icon="mdi-lock-outline"
        @click:append="show = !show"
        required
      ></v-text-field>
      <v-btn max-height="50px" block color="#00383e" @click="login">
        <span class="span-entrar">Entrar</span>
      </v-btn>
    </v-container>
  </v-form>
</template>

<script>
import Usuario from "@/models/usuario-model";
import usuarioService from "@/services/usuario-service";
import storageService from "@/util/storageService";

export default {
  data() {
    return {
      show: false,
      usuario: new Usuario(),
      email: "",
      senha: "",
      emailRules: [
        (v) => !!v || "Campo obrigatório",
        (v) => /.+@.+\..+/.test(v) || "E-mail inválido",
      ],
      senhaRules: [(v) => !!v || "Campo obrigatório"],
    };
  },

  methods: {
    login() {
      usuarioService
        .login(this.email, this.senha)
        .then((res) => {
          this.usuario = res.data.usuario;
          storageService.salvarUsuarioNaStorage(this.usuario);
          storageService.salvarTokenNaStorage(res.data.token);
          this.$router.push({ path: "/" });
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style scoped>
.box-login {
  max-width: 400px;
  min-height: 22rem;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(78, 77, 77, 0.445);
  border-radius: 10px;
  background-color: #fff;
  margin-top: 7rem;
  text-align: center;
  padding: 2rem;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

.titulo-login {
  font-weight: bold;
  font-size: 2rem;
}

.span-entrar {
  color: #fff;
}
</style>