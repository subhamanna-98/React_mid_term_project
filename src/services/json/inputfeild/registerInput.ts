// export const RegisterInputField = [
//   {
//     label: "Full Name",
//     name: "name",
//     type: "text",
//     placeholder: "Enter your full name",
//   },
//   {
//     label: "Email",
//     name: "email",
//     type: "email",
//     placeholder: "Enter your email",
//   },
//   {
//     label: "Password",
//     name: "password",
//     type: "password",
//     placeholder: "Enter your password",
//   },
// ];

import type { RegisterFormInputs } from "../../validation/RegisterValidation";



export interface IRegisterField {
  label: string;
  name: keyof RegisterFormInputs;
  type: "text" | "email" | "password" | "tel";
  placeholder: string;
  autoComplete?: string;
}

export const RegisterInputField: IRegisterField[] = [
  {
    label: "Full Name",
    name: "name",
    type: "text",
    placeholder: "Enter your full name",
    autoComplete: "name",
  },
  {
    label: "Email Address",
    name: "email",
    type: "email",
    placeholder: "Enter your email",
    autoComplete: "email",
  },
  {
    label: "Phone Number",
    name: "phone",
    type: "tel",
    placeholder: "Enter 10-digit phone number",
    autoComplete: "tel",
  },
  {
    label: "Password",
    name: "password",
    type: "password",
    placeholder: "Enter your password",
    autoComplete: "new-password",
  },
  {
    label: "Confirm Password",
    name: "confirmPassword",
    type: "password",
    placeholder: "Confirm your password",
    autoComplete: "new-password",
  },
];