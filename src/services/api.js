import axios from "axios";
import storageService from "@/util/storageService";

const http = axios.create({
  baseURL: "http://localhost:3400",
});

http.interceptors.request.use((config) => {
  config.headers.Authorization = storageService.obterTokenNaStorage();
  return config;
});

export default http;
