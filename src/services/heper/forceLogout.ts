
// import Cookies from 'js-cookie'

// export const forceLogout = () => {
//     Cookies.remove("token")
//     Cookies.remove("user")
//     window.location.href =("/login")
// }

import Cookies from "js-cookie";

export const forceLogout = () => {
  Cookies.remove("token");
  Cookies.remove("user");
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login";
};