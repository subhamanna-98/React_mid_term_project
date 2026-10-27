import React, { useMemo } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  IconButton,
  Divider,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";

import { bookingService } from "../services/bookingService";
import type { ICarItem } from "../services/carService";
import { bookingValidationSchema, type BookingFormInputs } from "../services/validation/bookingValidation";


interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  car: ICarItem | null;
  onSuccess?: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  open,
  onClose,
  car,
  onSuccess,
}) => {
  const [submitting, setSubmitting] = React.useState<boolean>(false);

  // Default dates: Pickup (Tomorrow), Dropoff (3 days later)
  const todayStr = new Date().toISOString().split("T")[0];

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<BookingFormInputs>({
    resolver: yupResolver(bookingValidationSchema),
    defaultValues: {
      pickupDate: "",
      dropoffDate: "",
      fullName: "",
      phone: "",
      drivingLicense: "",
      address: "",
    },
  });

  const pickupDateWatch = watch("pickupDate");
  const dropoffDateWatch = watch("dropoffDate");

  // Realtime Total Days & Price Calculation
  const calculation = useMemo(() => {
    if (!pickupDateWatch || !dropoffDateWatch || !car) {
      return { totalDays: 0, totalPrice: 0 };
    }

    const start = new Date(pickupDateWatch).getTime();
    const end = new Date(dropoffDateWatch).getTime();

    if (isNaN(start) || isNaN(end) || end <= start) {
      return { totalDays: 0, totalPrice: 0 };
    }

    const diffDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return {
      totalDays: diffDays,
      totalPrice: diffDays * car.pricePerDay,
    };
  }, [pickupDateWatch, dropoffDateWatch, car]);

  const handleFormSubmit = async (data: BookingFormInputs) => {
    if (!car) return;

    if (calculation.totalDays <= 0) {
      toast.error("Please select a valid date range");
      return;
    }

    try {
      setSubmitting(true);
      await bookingService.createBooking({
        carId: car._id,
        pickupDate: data.pickupDate,
        dropoffDate: data.dropoffDate,
        fullName: data.fullName,
        phone: data.phone,
        drivingLicense: data.drivingLicense,
        address: data.address,
      });

      toast.success("Booking request sent! Waiting for Admin approval.");
      reset();
      onClose();
      if (onSuccess) onSuccess();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to submit booking request"
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (!car) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      slotProps={{
        paper: {
          sx: {
            borderRadius: "16px",
            p: 1,
            bgcolor: "#ffffff",
          },
        },
      }}
    >
      {/* Modal Header */}
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontWeight: 700,
          color: "#111827",
          pb: 1,
        }}
      >
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Book {car.name}
          </Typography>
          <Typography variant="caption" sx={{ color: "#6b7280" }}>
            Daily Rate: ₹{car.pricePerDay}/day • {car.transmission}
          </Typography>
        </Box>
        <IconButton size="small" onClick={onClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent dividers sx={{ borderColor: "#e5e7eb" }}>
          {/* Car mini summary card */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              p: 1.5,
              mb: 2.5,
              borderRadius: "10px",
              bgcolor: "#f8fafc",
              border: "1px solid #e2e8f0",
            }}
          >
            <img
              src={car.image}
              alt={car.name}
              style={{
                width: 70,
                height: 50,
                objectFit: "cover",
                borderRadius: "6px",
              }}
            />
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                {car.name} ({car.fuelType})
              </Typography>
              <Typography variant="caption" sx={{ color: "#64748b" }}>
                Reg: {car.registrationNo} • {car.seats} Seats
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
            {/* Pickup Date */}
            <TextField
              type="date"
  label="Pickup Date"
  fullWidth
  slotProps={{
    inputLabel: { shrink: true },
    htmlInput: { min: todayStr },
  }}
  {...register("pickupDate")}
  error={!!errors.pickupDate}
  helperText={errors.pickupDate?.message}
            />

            {/* Drop-off Date */}
            <TextField
              type="date"
  label="Drop-off Date"
  fullWidth
  slotProps={{
    inputLabel: { shrink: true },
    htmlInput: { min: pickupDateWatch || todayStr },
  }}
  {...register("dropoffDate")}
  error={!!errors.dropoffDate}
  helperText={errors.dropoffDate?.message}
            />

            {/* Customer Full Name */}
            <TextField
              label="Full Name"
              placeholder="e.g. Rahul Sharma"
              fullWidth
              {...register("fullName")}
              error={!!errors.fullName}
              helperText={errors.fullName?.message}
            />

            {/* Phone Number */}
            <TextField
              label="Phone Number"
              placeholder="10-digit number"
              fullWidth
              {...register("phone")}
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />

            {/* Driving License */}
            <TextField
              label="Driving License No."
              placeholder="e.g. DL-1420110012345"
              fullWidth
              sx={{ gridColumn: "span 2" }}
              {...register("drivingLicense")}
              error={!!errors.drivingLicense}
              helperText={errors.drivingLicense?.message}
            />

            {/* Address */}
            <TextField
              label="Delivery / Residential Address"
              placeholder="City, State, Pincode"
              multiline
              rows={2}
              fullWidth
              sx={{ gridColumn: "span 2" }}
              {...register("address")}
            />
          </Box>

          {/* Pricing Estimation Summary */}
          <Box
            sx={{
              mt: 2.5,
              p: 2,
              borderRadius: "10px",
              bgcolor: "#eff6ff",
              border: "1px solid #bfdbfe",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CalendarMonthIcon sx={{ color: "#2563eb", fontSize: 20 }} />
                <Typography variant="body2" sx={{ fontWeight: 600, color: "#1e3a8a" }}>
                  Rental Duration:
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ fontWeight: 700, color: "#1e3a8a" }}>
                {calculation.totalDays} Day(s)
              </Typography>
            </Box>

            <Divider sx={{ my: 1, borderColor: "#dbeafe" }} />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: 700, color: "#1e3a8a" }}>
                Estimated Total:
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 800, color: "#2563eb" }}>
                ₹{calculation.totalPrice}
              </Typography>
            </Box>
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button
            onClick={onClose}
            disabled={submitting}
            sx={{ color: "#6b7280", textTransform: "none", fontWeight: 600 }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={submitting || calculation.totalDays <= 0}
            sx={{
              bgcolor: "#2563eb",
              borderRadius: "8px",
              textTransform: "none",
              fontWeight: 600,
              px: 3,
              "&:hover": { bgcolor: "#1d4ed8" },
            }}
          >
            {submitting ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              "Confirm & Request Booking"
            )}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default BookingModal;