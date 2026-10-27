// export interface LoginPayload  {
//     email: string,
//     password: string
// }
// export interface SignUpPayload  extends LoginPayload {
//     name: string
// }

import type { RegisterFormInputs } from "../../services/validation/RegisterValidation";



// Interfaz para la configuración de cada campo del formulario
export interface IRegisterField {
  label: string;
  name: keyof RegisterFormInputs;
  type: "text" | "email" | "password" | "tel";
  placeholder: string;
  autoComplete?: string;
}

// Interfaz para los datos que se envían al backend (Payload)
export interface IRegisterPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
}

// Interfaz para la información del usuario devuelta por la API
export interface IUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: "user" | "admin";
}

// Interfaz para la respuesta completa de la API de registro
export interface IRegisterResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: IUser;
  error?: string;
}