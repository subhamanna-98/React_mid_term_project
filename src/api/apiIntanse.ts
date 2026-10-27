// import Cookies from "js-cookie";
// import axios from "axios";
// import { forceLogout } from "../services/heper/forceLogout";
// const Api = axios.create({
//   baseURL: "https://news-blog-api.onrender.com/api",
// });

// Api.interceptors.request.use(
//   (config) => {
//     const token = Cookies.get("token");
//     if (token) {
//       config.headers.Authorization = `Bearer $(token)`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   },
// );

// Api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     // return Promise.reject(error)
//     console.log("axious inetr...", error.response);
//     if (error.response && error.response.status === 401) {
//       forceLogout();
//     }
//   },
// );
// export default Api;


import axios from "axios";
import Cookies from "js-cookie";
import { forceLogout } from "../services/heper/forceLogout";

const Api = axios.create({
  // Apnar local backend port (e.g. 3008 ba 5000)
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  withCredentials: true,
});

// Request Interceptor: Attach JWT Token
Api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
     
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle 401 Unauthorized Globally
Api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      forceLogout();
    }
   
    return Promise.reject(error);
  }
);

export default Api;