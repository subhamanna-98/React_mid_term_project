import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
  Chip,
  Divider,
} from "@mui/material";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import SettingsIcon from "@mui/icons-material/Settings";
import AirlineSeatReclineExtraIcon from "@mui/icons-material/AirlineSeatReclineExtra";
import type { ICarItem } from "../services/carService";


interface CarCardProps {
  car: ICarItem;
  onBookNow?: (car: ICarItem) => void;
}

export const CarCard: React.FC<CarCardProps> = ({ car, onBookNow }) => {
  const categoryName =
    typeof car.category === "object" ? car.category?.name : "Standard";

  const isAvailable = car.status === "Available";

  return (
    <Card
      sx={{
        borderRadius: "16px",
        overflow: "hidden",
        border: "1px solid #e5e7eb",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.04)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        bgcolor: "#ffffff",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 12px 24px -4px rgba(0, 0, 0, 0.08)",
        },
      }}
    >
      {/* Car Image + Category Badge */}
      <Box sx={{ position: "relative", bgcolor: "#f8fafc" }}>
        <CardMedia
          component="img"
          height="190"
          image={car.image}
          alt={car.name}
          sx={{ objectFit: "cover" }}
        />
        <Chip
          label={categoryName}
          size="small"
          sx={{
            position: "absolute",
            top: 12,
            left: 12,
            bgcolor: "rgba(255, 255, 255, 0.92)",
            fontWeight: 600,
            fontSize: "12px",
            color: "#1e293b",
            backdropFilter: "blur(4px)",
          }}
        />
      </Box>

      {/* Car Details */}
      <CardContent sx={{ p: 2.5, flexGrow: 1 }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 700, color: "#111827", fontSize: "18px", mb: 0.5 }}
        >
          {car.name}
        </Typography>

        <Typography variant="body2" sx={{ color: "#6b7280", mb: 2 }}>
          {car.transmission} Transmission • {car.registrationNo}
        </Typography>

        {/* Feature Badges: Fuel, Transmission, Seats */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            bgcolor: "#f8fafc",
            p: 1.5,
            borderRadius: "10px",
            mb: 2,
            border: "1px solid #f1f5f9",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <LocalGasStationIcon sx={{ fontSize: 17, color: "#64748b" }} />
            <Typography variant="caption" sx={{ fontWeight: 600, color: "#334155" }}>
              {car.fuelType}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <SettingsIcon sx={{ fontSize: 17, color: "#64748b" }} />
            <Typography variant="caption" sx={{ fontWeight: 600, color: "#334155" }}>
              {car.transmission}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <AirlineSeatReclineExtraIcon sx={{ fontSize: 17, color: "#64748b" }} />
            <Typography variant="caption" sx={{ fontWeight: 600, color: "#334155" }}>
              {car.seats} Seats
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 1.5 }} />

        {/* Price & Action Button */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: 1.5,
          }}
        >
          <Box>
            <Typography variant="caption" sx={{ color: "#64748b", display: "block" }}>
              Daily Rate
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 800, color: "#2563eb", lineHeight: 1 }}>
              ₹{car.pricePerDay}
              <Typography
                component="span"
                variant="caption"
                sx={{ color: "#64748b", fontWeight: 500, ml: 0.5 }}
              >
                /day
              </Typography>
            </Typography>
          </Box>

          <Button
            variant="contained"
            disabled={!isAvailable}
            onClick={() => onBookNow && onBookNow(car)}
            sx={{
              bgcolor: isAvailable ? "#2563eb" : "#94a3b8",
              borderRadius: "8px",
              textTransform: "none",
              fontWeight: 600,
              px: 2,
              py: 0.8,
              fontSize: "14px",
              "&:hover": {
                bgcolor: isAvailable ? "#1d4ed8" : "#94a3b8",
              },
            }}
          >
            {isAvailable ? "Rent Now" : "Rented Out"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CarCard;