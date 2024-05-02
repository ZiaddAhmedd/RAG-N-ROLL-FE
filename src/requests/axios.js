import axios from "axios";

const instance = axios.create({
  baseURL: "https://pegasus-fun-locust.ngrok-free.app/",
});

instance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers.ID = sessionStorage.getItem("ID");
    }

    return config;
  },
  (error) => {

    return Promise.reject(error);
  }
);

export default instance;
