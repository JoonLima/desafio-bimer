import http from "@/services/api.js";

function login(usuario) {
  return new Promise((resolve, reject) => {
    return http
      .post("/login", usuario)
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
}

export default {
  login,
};
