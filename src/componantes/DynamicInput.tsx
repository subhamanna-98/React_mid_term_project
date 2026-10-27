import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

interface DynamicInputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  autoComplete?: string;
}
 const DynamicInput = ({
    label,
  name,
  type = "text",
  placeholder,
  register,
  errors,
  autoComplete,
 }:DynamicInputProps) => {
    const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : (type === "textarea" ? "text" : type);
  const errorMessage = errors[name]?.message as string | undefined;

  return (
    <TextField
      fullWidth
      margin="normal"
      label={label}
      type={inputType}
      placeholder={placeholder}
      multiline={type === "textarea"}
      rows={type === "textarea" ? 4 : undefined}
      autoComplete={autoComplete}
      {...register(name)}
      error={!!errorMessage}
      helperText={errorMessage}
      slotProps={{
        input: {
          endAdornment: isPassword ? (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword((prev) => !prev)}
                edge="end"
                tabIndex={-1}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ) : undefined,
        },
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "8px",
          "&.Mui-focused fieldset": {
            borderColor: "#dc2626", // Red-600 theme color
          },
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: "#dc2626",
        },
      }}
    />
  )
}
export default DynamicInput