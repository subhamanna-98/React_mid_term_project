// import { Navigate, Outlet } from "react-router-dom"
// import Cookies from 'js-cookie'


//  const AdminPRotected = () => {
//     const token = Cookies.get("token")
//     const user = JSON.parse(Cookies.get("user") as string)
//     const Isadmin = token && user.role === " admin"
//   return (
//   Isadmin ? <Outlet/>: <Navigate to = "/login"/>
//   )
// }
// export default AdminPRotected

import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const AdminProtected = () => {
  const token = Cookies.get("token");
  const rawUser = Cookies.get("user");

  let user = null;
  if (rawUser) {
    try {
      user = JSON.parse(rawUser);
    } catch {
      user = null;
    }
  }

  
  const isAdmin = token && user?.role === "admin";

  return isAdmin ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AdminProtected;