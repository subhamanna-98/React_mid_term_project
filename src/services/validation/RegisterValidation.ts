// import * as yup from "yup";

// export const RegisterSchema = yup.object().shape({
//   name: yup
//     .string()
//     .required("Name is required")
//     .min(3, "Name must be at least 3 characters"),
//   email: yup
//     .string()
//     .required("Email is required")
//     .email("Enter a valid email"),
//   password: yup
//     .string()
//     .required("Password is required")
//     .min(6, "Password must be at least 6 characters"),
// });


import * as Yup from "yup";

export const registerValidationSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name cannot exceed 50 characters")
    .required("Full name is required"),

  email: Yup.string()
    .trim()
    .email("Invalid email format")
    .required("Email address is required"),

  phone: Yup.string()
    .trim()
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone number is required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    )
    .required("Password is required"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

export type RegisterFormInputs = Yup.InferType<typeof registerValidationSchema>;