
// import * as yup from "yup"

// export const LoginSchema =yup.object({
//     email : yup.string().email().required("email is required"),
//     password : yup.string().required("password is required")
// })

import * as Yup from "yup";

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email("Invalid email format")
    .required("Email address is required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export type LoginFormInputs = Yup.InferType<typeof loginValidationSchema>;