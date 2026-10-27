import type { CategoryFormInputs } from "../../validation/categoryValidation";


export interface ICategoryFieldOption {
  label: string;
  value: string;
}

export interface ICategoryField {
  label: string;
  name: keyof CategoryFormInputs;
  type: "text" | "select" | "textarea" | "file";
  placeholder?: string;
  options?: ICategoryFieldOption[];
  multiline?: boolean;
  rows?: number;
  accept?: string;
  required?: boolean;
}

export const CategoryInputFields: ICategoryField[] = [
  {
    label: "Category Image",
    name: "image",
    type: "file",
    accept: "image/png, image/jpeg, image/jpg, image/webp",
    required: true,
  },
  {
    label: "Category Name",
    name: "name",
    type: "text",
    placeholder: "e.g. SUV, Luxury, Sedan",
    required: true,
  },
  {
    label: "Status",
    name: "status",
    type: "select",
    options: [
      { label: "Active", value: "Active" },
      { label: "Inactive", value: "Inactive" },
    ],
    required: true,
  },
  {
    label: "Description",
    name: "description",
    type: "textarea",
    placeholder: "Short description about this car category...",
    multiline: true,
    rows: 3,
    required: false,
  },
];