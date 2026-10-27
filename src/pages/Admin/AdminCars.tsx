



import React, { useEffect, useState, useMemo } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  CircularProgress,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
   Grid,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import { carService, type ICarItem } from "../../services/carService";
import { categoryService, type ICategory } from "../../services/categoryService";
import { carValidationSchema, type CarFormInputs } from "../../services/validation/carValidation";
import { getCarInputFields, type ICarFieldOption } from "../../services/json/inputfeild/carFieldConfig";
import CarDynamicInput from "../../componantes/CarDynamicInput";

// import {
//   carValidationSchema,
//   CarFormInputs,
// } from "../../validation/carValidation";
// import { getCarInputFields, ICarFieldOption } from "../../config/carFieldConfig";
// import CarDynamicInput from "../../components/Admin/CarDynamicInput";
// import { carService, ICarItem } from "../../services/carService";
// import { categoryService, ICategory } from "../../services/categoryService";

const AdminCars: React.FC = () => {
  const [cars, setCars] = useState<ICarItem[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<string>("All");

  // Modal States
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [editingCar, setEditingCar] = useState<ICarItem | null>(null);

  // React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CarFormInputs>({
    resolver: yupResolver(carValidationSchema),
    context: { isEdit: !!editingCar },
    defaultValues: {
      name: "",
      category: "",
      registrationNo: "",
      fuelType: "Petrol",
      transmission: "Manual",
      seats: 5,
      pricePerDay: 2000,
      status: "Available",
      description: "",
      image: null,
    },
  });

  // Fetch Cars & Categories
  const fetchData = async () => {
    try {
      setLoading(true);
      const [carsData, catData] = await Promise.all([
        carService.getAllCars(),
        categoryService.getAllCategories(),
      ]);
      setCars(Array.isArray(carsData) ? carsData : []);
      setCategories(Array.isArray(catData) ? catData : []);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to load cars");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Category Options for Form Dropdown
  const categoryOptions: ICarFieldOption[] = useMemo(() => {
    return categories.map((cat) => ({
      label: cat.name,
      value: cat._id,
    }));
  }, [categories]);

  const carFields = useMemo(() => {
    return getCarInputFields(categoryOptions);
  }, [categoryOptions]);

  // Filter Cars by Status
  const filteredCars = useMemo(() => {
    if (!Array.isArray(cars)) return [];
    if (selectedFilter === "All") return cars;
    return cars.filter((c) => c.status === selectedFilter);
  }, [cars, selectedFilter]);

  // Modal Handlers
  const handleOpenAdd = () => {
    setEditingCar(null);
    reset({
      name: "",
      category: categories[0]?._id || "",
      registrationNo: "",
      fuelType: "Petrol",
      transmission: "Manual",
      seats: 5,
      pricePerDay: 2000,
      status: "Available",
      description: "",
      image: null,
    });
    setOpenModal(true);
  };

  const handleOpenEdit = (car: ICarItem) => {
    setEditingCar(car);
    const categoryId =
      typeof car.category === "object" ? car.category._id : car.category;

    reset({
      name: car.name,
      category: categoryId,
      registrationNo: car.registrationNo,
      fuelType: car.fuelType,
      transmission: car.transmission,
      seats: car.seats,
      pricePerDay: car.pricePerDay,
      status: car.status,
      description: car.description || "",
      image: null,
    });
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditingCar(null);
    reset();
  };

  // Submit Handler
  const onSubmit = async (data: CarFormInputs) => {
    try {
      setBtnLoading(true);
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("category", data.category);
      formData.append("registrationNo", data.registrationNo.toUpperCase());
      formData.append("fuelType", data.fuelType);
      formData.append("transmission", data.transmission || "Manual");
      formData.append("seats", String(data.seats));
      formData.append("pricePerDay", String(data.pricePerDay));
      formData.append("status", data.status || "Available");

      if (data.description) formData.append("description", data.description);
      if (data.image instanceof File) {
        formData.append("image", data.image);
      }

      if (editingCar) {
        await carService.updateCar(editingCar._id, formData);
        toast.success("Car updated successfully");
      } else {
        await carService.createCar(formData);
        toast.success("Car added successfully");
      }

      handleCloseModal();
      fetchData();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Operation failed");
    } finally {
      setBtnLoading(false);
    }
  };

  // Delete Handler
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to remove this car?")) return;
    try {
      await carService.deleteCar(id);
      toast.success("Car deleted successfully");
      setCars((prev) => prev.filter((item) => item._id !== id));
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to delete car");
    }
  };

  // Helper for Status Badge Color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return { bg: "#dcfce7", color: "#16a34a" };
      case "Rented":
        return { bg: "#fee2e2", color: "#dc2626" };
      case "Maintenance":
        return { bg: "#fef3c7", color: "#d97706" };
      default:
        return { bg: "#f3f4f6", color: "#6b7280" };
    }
  };

  return (
    <Box>
      {/* Top Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2.5,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700, color: "#111827" }}>
            Fleet & Vehicle Inventory
          </Typography>
          <Typography variant="body2" sx={{ color: "#6b7280" }}>
            Manage rental fleet, rates, transmission, and operational statuses
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenAdd}
          sx={{
            bgcolor: "#2563eb",
            borderRadius: "8px",
            textTransform: "none",
            fontWeight: 600,
            px: 2,
            py: 1,
            "&:hover": { bgcolor: "#1d4ed8" },
          }}
        >
          Add Vehicle
        </Button>
      </Box>

      {/* Filter Tabs */}
      <Box sx={{ display: "flex", gap: 1, mb: 2.5, flexWrap: "wrap" }}>
        {["All", "Available", "Rented", "Maintenance"].map((tab) => (
          <Chip
            key={tab}
            label={tab}
            clickable
            onClick={() => setSelectedFilter(tab)}
            sx={{
              fontWeight: 500,
              fontSize: "13px",
              borderRadius: "99px",
              bgcolor: selectedFilter === tab ? "#2563eb" : "#ffffff",
              color: selectedFilter === tab ? "#ffffff" : "#6b7280",
              border: `1px solid ${selectedFilter === tab ? "#2563eb" : "#e5e7eb"}`,
              "&:hover": {
                bgcolor: selectedFilter === tab ? "#1d4ed8" : "#f3f4f6",
              },
            }}
          />
        ))}
      </Box>

      {/* Cars Table */}
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          border: "1px solid #e5e7eb",
          borderRadius: "12px",
          bgcolor: "#ffffff",
          overflow: "hidden",
        }}
      >
        <Table sx={{ minWidth: 800 }}>
          <TableHead sx={{ bgcolor: "#fafafa" }}>
            <TableRow>
              <TableCell sx={{ color: "#6b7280", fontWeight: 600, fontSize: "12px" }}>
                VEHICLE
              </TableCell>
              <TableCell sx={{ color: "#6b7280", fontWeight: 600, fontSize: "12px" }}>
                CATEGORY
              </TableCell>
              <TableCell sx={{ color: "#6b7280", fontWeight: 600, fontSize: "12px" }}>
                REG. NO
              </TableCell>
              <TableCell sx={{ color: "#6b7280", fontWeight: 600, fontSize: "12px" }}>
                SPECIFICATIONS
              </TableCell>
              <TableCell sx={{ color: "#6b7280", fontWeight: 600, fontSize: "12px" }}>
                RATE / DAY
              </TableCell>
              <TableCell sx={{ color: "#6b7280", fontWeight: 600, fontSize: "12px" }}>
                STATUS
              </TableCell>
              <TableCell align="right" sx={{ color: "#6b7280", fontWeight: 600, fontSize: "12px" }}>
                ACTIONS
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
                  <CircularProgress size={32} />
                  <Typography variant="body2" sx={{ mt: 1, color: "#6b7280" }}>
                    Loading vehicles...
                  </Typography>
                </TableCell>
              </TableRow>
            ) : filteredCars.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
                  <Typography variant="body1" sx={{ color: "#6b7280" }}>
                    No cars available. Click "Add Vehicle" to register one.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredCars.map((car) => {
                const statusStyle = getStatusColor(car.status);
                const categoryName =
                  typeof car.category === "object"
                    ? car.category?.name
                    : "Standard";

                return (
                  <TableRow
                    key={car._id}
                    hover
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    {/* Vehicle Image & Name */}
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <Avatar
                          src={car.image}
                          variant="rounded"
                          sx={{
                            width: 50,
                            height: 38,
                            borderRadius: "6px",
                            bgcolor: "#e2e8f0",
                          }}
                        >
                          🚗
                        </Avatar>
                        <Box>
                          <Typography sx={{ fontWeight: 600, color: "#111827", fontSize: "14px" }}>
                            {car.name}
                          </Typography>
                          <Typography variant="caption" sx={{ color: "#6b7280" }}>
                            {car.transmission}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    {/* Category */}
                    <TableCell sx={{ color: "#374151", fontSize: "13px", fontWeight: 500 }}>
                      {categoryName}
                    </TableCell>

                    {/* Registration No */}
                    <TableCell sx={{ color: "#111827", fontSize: "13px", fontFamily: "monospace", fontWeight: 600 }}>
                      {car.registrationNo}
                    </TableCell>

                    {/* Specs */}
                    <TableCell sx={{ color: "#6b7280", fontSize: "13px" }}>
                      {car.fuelType} • {car.seats} Seats
                    </TableCell>

                    {/* Rate */}
                    <TableCell sx={{ fontWeight: 700, color: "#111827", fontSize: "14px" }}>
                      ₹{car.pricePerDay}
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      <Chip
                        size="small"
                        label={car.status}
                        sx={{
                          fontSize: "12px",
                          fontWeight: 600,
                          borderRadius: "99px",
                          bgcolor: statusStyle.bg,
                          color: statusStyle.color,
                        }}
                      />
                    </TableCell>

                    {/* Actions */}
                    <TableCell align="right">
                      <IconButton
                        size="small"
                        onClick={() => handleOpenEdit(car)}
                        sx={{ color: "#2563eb", mr: 0.5 }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(car._id)}
                        sx={{ color: "#dc2626" }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                    {/* Actions Column: Edit + Delete Buttons */}
<TableCell align="right" sx={{ whiteSpace: "nowrap" }}>
  {/* Edit Button */}
  <IconButton
    size="small"
    onClick={() => handleOpenEdit(car)}
    title="Edit Vehicle"
    sx={{
      color: "#2563eb",
      bgcolor: "#eff6ff",
      mr: 1,
      borderRadius: "6px",
      transition: "all 0.2s",
      "&:hover": {
        bgcolor: "#dbeafe",
        color: "#1d4ed8",
      },
    }}
  >
    <EditIcon fontSize="small" />
  </IconButton>

  {/* Delete Button */}
  <IconButton
    size="small"
    onClick={() => handleDelete(car._id)}
    title="Delete Vehicle"
    sx={{
      color: "#dc2626",
      bgcolor: "#fef2f2",
      borderRadius: "6px",
      transition: "all 0.2s",
      "&:hover": {
        bgcolor: "#fee2e2",
        color: "#b91c1c",
      },
    }}
  >
    <DeleteIcon fontSize="small" />
  </IconButton>
</TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add / Edit Car Dialog Modal */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        fullWidth
        maxWidth="md"
        slotProps={{
          paper: {
            sx: { borderRadius: "12px", p: 1 },
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontWeight: 700,
            fontSize: "18px",
            color: "#111827",
            pb: 1,
          }}
        >
          {editingCar ? "Edit Vehicle" : "Add New Vehicle"}
          <IconButton onClick={handleCloseModal} size="small">
            <CloseIcon fontSize="small" />
          </IconButton>
        </DialogTitle>

        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent dividers sx={{ borderColor: "#e5e7eb" }}>
            <Grid container spacing={2}>
              {carFields.map((field) => (
                <Grid
                  key={field.name}
      size={{ xs: 12, sm: field.gridSpan || 12 }}
                >
                  <CarDynamicInput
                    field={field}
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    defaultImageUrl={editingCar?.image}
                  />
                </Grid>
              ))}
            </Grid>
          </DialogContent>

          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button
              onClick={handleCloseModal}
              disabled={btnLoading}
              sx={{ color: "#6b7280", textTransform: "none", fontWeight: 600 }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={btnLoading}
              sx={{
                bgcolor: "#2563eb",
                borderRadius: "8px",
                textTransform: "none",
                fontWeight: 600,
                px: 2.5,
                "&:hover": { bgcolor: "#1d4ed8" },
              }}
            >
              {btnLoading ? (
                <CircularProgress size={20} color="inherit" />
              ) : editingCar ? (
                "Update Vehicle"
              ) : (
                "Save Vehicle"
              )}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default AdminCars