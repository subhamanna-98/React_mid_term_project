import type { CarFormInputs } from "../../validation/carValidation";


export interface ICarFieldOption {
  label: string;
  value: string | number;
}

export interface ICarField {
  label: string;
  name: keyof CarFormInputs;
  type: "text" | "number" | "select" | "textarea" | "file";
  placeholder?: string;
  options?: ICarFieldOption[];
  multiline?: boolean;
  rows?: number;
  accept?: string;
  required?: boolean;
  gridSpan?: 6 | 12; // Grid layout adjustment (6 = half width, 12 = full width)
}

export const getCarInputFields = (categoryOptions: ICarFieldOption[] = []): ICarField[] => [
  {
    label: "Car Image",
    name: "image",
    type: "file",
    accept: "image/png, image/jpeg, image/jpg, image/webp",
    required: true,
    gridSpan: 12,
  },
  {
    label: "Car Model & Name",
    name: "name",
    type: "text",
    placeholder: "e.g. Toyota Fortuner 4x4",
    required: true,
    gridSpan: 6,
  },
  {
    label: "Category",
    name: "category",
    type: "select",
    placeholder: "Select vehicle category",
    options: categoryOptions,
    required: true,
    gridSpan: 6,
  },
  {
    label: "Registration Number",
    name: "registrationNo",
    type: "text",
    placeholder: "e.g. WB02AK1234",
    required: true,
    gridSpan: 6,
  },
  {
    label: "Price Per Day (₹)",
    name: "pricePerDay",
    type: "number",
    placeholder: "e.g. 4500",
    required: true,
    gridSpan: 6,
  },
  {
    label: "Fuel Type",
    name: "fuelType",
    type: "select",
    options: [
      { label: "Petrol", value: "Petrol" },
      { label: "Diesel", value: "Diesel" },
      { label: "CNG", value: "CNG" },
      { label: "Electric (EV)", value: "EV" },
    ],
    required: true,
    gridSpan: 6,
  },
  {
    label: "Transmission",
    name: "transmission",
    type: "select",
    options: [
      { label: "Manual", value: "Manual" },
      { label: "Automatic", value: "Automatic" },
    ],
    required: true,
    gridSpan: 6,
  },
  {
    label: "Seats",
    name: "seats",
    type: "number",
    placeholder: "e.g. 5 or 7",
    required: true,
    gridSpan: 6,
  },
  {
    label: "Status",
    name: "status",
    type: "select",
    options: [
      { label: "Available", value: "Available" },
      { label: "Rented", value: "Rented" },
      { label: "Maintenance", value: "Maintenance" },
    ],
    required: true,
    gridSpan: 6,
  },
  {
    label: "Car Description",
    name: "description",
    type: "textarea",
    placeholder: "Key details, mileage notes, special specs...",
    multiline: true,
    rows: 3,
    required: false,
    gridSpan: 12,
  },
];