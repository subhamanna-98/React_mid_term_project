// import Api from "../api/Api";
// import { Endpoint } from "../api/endpoint";
import Cookies from "js-cookie";
import type { RegisterFormInputs } from "./validation/RegisterValidation";
import type { LoginFormInputs } from "./validation/LoginValidation";
import Api from "../api/apiIntanse";
import Endpoint from "./heper/endpoint";


// User & Auth Response Types
export interface IUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: "user" | "admin";
}

export interface IAuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: IUser;
}

// ================= REGISTER SERVICE =================
export const registerUser = async (
  formData: RegisterFormInputs
): Promise<IAuthResponse> => {
  // backend-e confirmPassword pathanor dorkar nei, tai confirmPassword baad dewa holo
  const { confirmPassword, ...payload } = formData;

  const response = await Api.post<IAuthResponse>(
    Endpoint.auth.register,
    payload
  );

  return response.data;
};

// ================= LOGIN SERVICE =================
export const loginUser = async (
  credentials: LoginFormInputs
): Promise<IAuthResponse> => {
  const response = await Api.post<IAuthResponse>(
    Endpoint.auth.login,
    credentials
  );

  // Login successful hole Token & User data Cookies ebong LocalStorage-e set kora
  if (response.data.success && response.data.token) {
    // 7 diner jonno cookie set kora
    Cookies.set("token", response.data.token, { expires: 7 });

    if (response.data.user) {
      Cookies.set("user", JSON.stringify(response.data.user), { expires: 7 });
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }
  }

  return response.data;
};

// ================= LOGOUT SERVICE =================
export const logoutUser = () => {
  Cookies.remove("token");
  Cookies.remove("user");
  localStorage.removeItem("user");
  window.location.href = "/login";
};