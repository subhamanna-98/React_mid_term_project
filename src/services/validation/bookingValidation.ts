import * as Yup from "yup";

export const bookingValidationSchema = Yup.object().shape({
  pickupDate: Yup.string().required("Pickup date is required"),
  dropoffDate: Yup.string()
    .required("Drop-off date is required")
    .test(
      "is-after-pickup",
      "Drop-off date must be after pickup date",
      function (value) {
        const { pickupDate } = this.parent;
        if (!pickupDate || !value) return true;
        return new Date(value).getTime() > new Date(pickupDate).getTime();
      }
    ),
  fullName: Yup.string()
    .trim()
    .min(3, "Name must be at least 3 characters")
    .required("Full name is required"),
  phone: Yup.string()
    .trim()
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone number is required"),
  drivingLicense: Yup.string()
    .trim()
    .min(5, "Driving license must be valid")
    .required("Driving license number is required"),
  address: Yup.string().trim().optional(),
});

export type BookingFormInputs = Yup.InferType<typeof bookingValidationSchema>;