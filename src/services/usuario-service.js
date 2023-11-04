import http from "@/services/api.js";

function login(email, senha) {
  return new Promise((resolve, reject) => {
    return http
      .post("/login", { email, senha })
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
}

export default {
  login,
};
