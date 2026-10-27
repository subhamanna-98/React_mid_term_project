import React, { useState, useRef } from "react";
import {
  TextField,
  MenuItem,
  Box,
  Typography,
  Button,
  FormHelperText,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import type { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import type { ICategoryField } from "../services/json/inputfeild/categoryFieldConfig";


interface DynamicCategoryInputProps {
  field: ICategoryField;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  setValue?: UseFormSetValue<any>;
  defaultImageUrl?: string;
}

const DynamicCategoryInput: React.FC<DynamicCategoryInputProps> = ({
  field,
  register,
  errors,
  setValue,
  defaultImageUrl,
}) => {
  const { name, label, type, placeholder, options, multiline, rows, accept, required } = field;
  const errorMessage = errors[name]?.message as string | undefined;

  // Image Preview State (file type-er jonno)
  const [imagePreview, setImagePreview] = useState<string | null>(defaultImageUrl || null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // File upload change handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && setValue) {
      setValue(name, file, { shouldValidate: true });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove uploaded image
  const handleRemoveImage = () => {
    if (setValue) {
      setValue(name, null, { shouldValidate: true });
    }
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // 1. FILE UPLOAD FIELD
  if (type === "file") {
    return (
      <Box sx={{ my: 1.5 }}>
        <Typography variant="body2" sx={{ mb: 1, fontWeight: 600, color: "#374151" }}>
          {label} {required && "*"}
        </Typography>

        {imagePreview ? (
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: 150,
              borderRadius: "8px",
              overflow: "hidden",
              border: "1px solid #e5e7eb",
              bgcolor: "#ffffff",
            }}
          >
            <img
              src={imagePreview}
              alt="Category Preview"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <Button
              size="small"
              variant="contained"
              color="error"
              startIcon={<DeleteIcon/>}
              onClick={handleRemoveImage}
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                textTransform: "none",
                borderRadius: "6px",
                py: 0.4,
                px: 1.2,
                fontSize: "12px",
              }}
            >
              Change
            </Button>
          </Box>
        ) : (
          <Box
            onClick={() => fileInputRef.current?.click()}
            sx={{
              border: `2px dashed ${errorMessage ? "#dc2626" : "#e5e7eb"}`,
              borderRadius: "8px",
              height: 130,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              bgcolor: "#ffffff",
              transition: "border-color 0.2s",
              "&:hover": { borderColor: "#2563eb", bgcolor: "#f8fafc" },
            }}
          >
            <CloudUploadIcon sx={{ fontSize: 32, color: "#9ca3af", mb: 0.5 }} />
            <Typography variant="body2" sx={{ fontWeight: 500, color: "#111827" }}>
              Click to upload {label.toLowerCase()}
            </Typography>
            <Typography variant="caption" sx={{ color: "#6b7280" }}>
              PNG, JPG or WEBP (Max 2MB)
            </Typography>
          </Box>
        )}

        <input
          type="file"
          ref={fileInputRef}
          accept={accept}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

        {errorMessage && (
          <FormHelperText error sx={{ mt: 0.6, fontSize: "12px" }}>
            {errorMessage}
          </FormHelperText>
        )}
      </Box>
    );
  }

  // 2. SELECT DROPDOWN FIELD
  if (type === "select") {
    return (
      <TextField
        select
        fullWidth
        margin="normal"
        label={`${label} ${required ? "*" : ""}`}
        defaultValue={options?.[0]?.value || ""}
        {...register(name)}
        error={!!errorMessage}
        helperText={errorMessage}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
            bgcolor: "#ffffff",
            "&.Mui-focused fieldset": {
              borderColor: "#2563eb",
            },
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#2563eb",
          },
        }}
      >
        {options?.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </TextField>
    );
  }

  // 3. TEXT & TEXTAREA FIELD
  return (
    <TextField
      fullWidth
      margin="normal"
      label={`${label} ${required ? "*" : ""}`}
      placeholder={placeholder}
      multiline={multiline || type === "textarea"}
      rows={rows || (type === "textarea" ? 3 : undefined)}
      {...register(name)}
      error={!!errorMessage}
      helperText={errorMessage}
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "8px",
          bgcolor: "#ffffff",
          "&.Mui-focused fieldset": {
            borderColor: "#2563eb",
          },
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: "#2563eb",
        },
      }}
    />
  );
};

export default DynamicCategoryInput;