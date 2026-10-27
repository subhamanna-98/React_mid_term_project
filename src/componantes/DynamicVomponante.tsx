// import { TextField } from "@mui/material";
// import type { FieldErrors, UseFormRegister } from "react-hook-form";
// // import type { FieldErrors, UseFormRegister } from "react-hook-form";


// interface DynamicComponentProps {
//   label: string;
//   name: string;
//   type?: string;
//   placeholder?: string;
//   register: UseFormRegister<any>;
//   errors: FieldErrors<any>;
// }

// const DynamicVomponante = ({
//   label,
//   name,
//   type = "text",
//   placeholder,
//   register,
//   errors,
// }: DynamicComponentProps) => {
  
//   const errormessage = errors[name]?.message as string | undefined;

//   return (
//     <TextField
//       fullWidth
//       margin="normal"
//       label={label}
//       type={type === "textarea" ? "text" : type}
//       multiline={type === "textarea"}
//       rows={type === "textarea" ? 4 : undefined}
//       placeholder={placeholder}
//       {...register(name)}
//       error={!!errormessage}
//       helperText={errormessage}
//     />
//   );
// };

// export default DynamicVomponante;
