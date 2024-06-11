import axios from "axios";
class Api {
  instance;
  constructor() {
    this.instance = axios.create({
      baseURL: "http://3.106.229.48:8080",
      timeout: 200000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    this.instance.interceptors.response.use(
      (response) => {
        if (
          response.config.url == "login" ||
          response.config.url === "social"
        ) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("role", response.data.role);
          window.location.replace("/");
        }
        return response;
      },
      (error) => {
        if (error.response.data.message === "expired_session") {
          localStorage.removeItem("token");
          window.location.replace("login");
        }
        return Promise.reject(error);
      }
    );
  }
}
const api = new Api().instance;
export default api;
