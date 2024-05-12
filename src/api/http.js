import axios from "axios";

class Api {
  instance;
  constructor() {
    this.instance = axios.create({
      baseURL: "http://localhost:8080",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }



}
const api = new Api().instance;
export default api;
