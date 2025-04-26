import axios from "axios";

export const api = axios.create({
  baseURL: "https://jcwppapi.jcdev.com.br",
});
