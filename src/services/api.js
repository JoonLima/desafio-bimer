import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:3400",
});

export default http;
