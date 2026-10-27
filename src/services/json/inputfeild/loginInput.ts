// export const LoginputFeild = [
//     {
//         label:"Email",
//         name: "email",
//         type: "email",
//         placeholder:"Enter your email"
//     },
//      {
//         label:"Password",
//         name: "password",
//         type: "password",
//         placeholder:"Enter your Password"
//     }
// ]

import type { LoginFormInputs } from "../../validation/LoginValidation";



export interface ILoginField {
  label: string;
  name: keyof LoginFormInputs;
  type: "email" | "password" | "text";
  placeholder: string;
  autoComplete?: string;
}

export const LoginInputField: ILoginField[] = [
  {
    label: "Email Address",
    name: "email",
    type: "email",
    placeholder: "Enter your registered email",
    autoComplete: "email",
  },
  {
    label: "Password",
    name: "password",
    type: "password",
    placeholder: "Enter your password",
    autoComplete: "current-password",
  },
];