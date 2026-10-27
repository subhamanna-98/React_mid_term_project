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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import {
  categoryService,
  type ICategory,
} from "../../services/categoryService";
import {
  categoryValidationSchema,
  type CategoryFormInputs,
} from "../../services/validation/categoryValidation";
import DynamicCategoryInput from "../../componantes/DynamicCategoryInput";
import { CategoryInputFields } from "../../services/json/inputfeild/categoryFieldConfig";


const AdminCategory: React.FC = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<string>("All");

  // Modal States
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [editingCategory, setEditingCategory] = useState<ICategory | null>(
    null,
  );

  // React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CategoryFormInputs>({
    resolver: yupResolver(categoryValidationSchema),
    context: { isEdit: !!editingCategory },
    defaultValues: {
      name: "",
      status: "Active",
      description: "",
      image: null,
    },
  });

  // Fetch Categories
  const fetchCategories = async () => {
  try {
    setLoading(true);
    const data = await categoryService.getAllCategories();
    // Safety check: ensure array
    setCategories(Array.isArray(data) ? data : []);
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "Failed to load categories");
    setCategories([]);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchCategories();
  }, []);

  // Filter Categories
 const filteredCategories = useMemo(() => {
  if (!Array.isArray(categories)) return [];
  if (selectedFilter === "All") return categories;
  return categories.filter((c) => c.status === selectedFilter);
}, [categories, selectedFilter]);
  // Modal Open Handlers
  const handleOpenAdd = () => {
    setEditingCategory(null);
    reset({
      name: "",
      status: "Active",
      description: "",
      image: null,
    });
    setOpenModal(true);
  };

  const handleOpenEdit = (item: ICategory) => {
    setEditingCategory(item);
    reset({
      name: item.name,
      status: item.status,
      description: item.description || "",
      image: null,
    });
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditingCategory(null);
    reset();
  };

  // Submit Handler
  const onSubmit = async (data: CategoryFormInputs) => {
    try {
      setBtnLoading(true);
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("status", data.status);
      if (data.description) formData.append("description", data.description);
      if (data.image instanceof File) {
        formData.append("image", data.image);
      }

      if (editingCategory) {
        await categoryService.updateCategory(editingCategory._id, formData);
        toast.success("Category updated successfully");
      } else {
        await categoryService.createCategory(formData);
        toast.success("Category created successfully");
      }

      handleCloseModal();
      fetchCategories();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Operation failed");
    } finally {
      setBtnLoading(false);
    }
  };

  // Delete Handler
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;
    try {
      await categoryService.deleteCategory(id);
      toast.success("Category deleted");
      setCategories((prev) => prev.filter((item) => item._id !== id));
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to delete");
    }
  };
  return (
    <Box>
      {/* Top Action Header */}
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
            Car Categories
          </Typography>
          <Typography variant="body2" sx={{ color: "#6b7280" }}>
            Manage and organize vehicle classification segments
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
          Add Category
        </Button>
      </Box>

      {/* Filter Tabs / Chips */}
      <Box sx={{ display: "flex", gap: 1, mb: 2.5 }}>
        {["All", "Active", "Inactive"].map((tab) => (
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

      {/* Categories Table View */}
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
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ bgcolor: "#fafafa" }}>
            <TableRow>
              <TableCell
                sx={{ color: "#6b7280", fontWeight: 600, fontSize: "12px" }}
              >
                CATEGORY
              </TableCell>
              <TableCell
                sx={{ color: "#6b7280", fontWeight: 600, fontSize: "12px" }}
              >
                SLUG
              </TableCell>
              <TableCell
                sx={{ color: "#6b7280", fontWeight: 600, fontSize: "12px" }}
              >
                DESCRIPTION
              </TableCell>
              <TableCell
                sx={{ color: "#6b7280", fontWeight: 600, fontSize: "12px" }}
              >
                STATUS
              </TableCell>
              <TableCell
                align="right"
                sx={{ color: "#6b7280", fontWeight: 600, fontSize: "12px" }}
              >
                ACTIONS
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 6 }}>
                  <CircularProgress size={32} />
                  <Typography variant="body2" sx={{ mt: 1, color: "#6b7280" }}>
                    Loading categories...
                  </Typography>
                </TableCell>
              </TableRow>
            ) : filteredCategories.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 6 }}>
                  <Typography variant="body1" sx={{ color: "#6b7280" }}>
                    No categories found. Click "Add Category" to create one.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredCategories.map((row) => (
                <TableRow
                  key={row._id}
                  hover
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {/* Category Image & Name */}
                  <TableCell>
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
                    >
                      <Avatar
                        src={row.image}
                        variant="rounded"
                        sx={{
                          width: 44,
                          height: 44,
                          borderRadius: "8px",
                          bgcolor: "#dbeafe",
                        }}
                      >
                        🚗
                      </Avatar>
                      <Typography
                        sx={{
                          fontWeight: 600,
                          color: "#111827",
                          fontSize: "14px",
                        }}
                      >
                        {row.name}
                      </Typography>
                    </Box>
                  </TableCell>

                  {/* Slug */}
                  <TableCell sx={{ color: "#6b7280", fontSize: "13px" }}>
                    {row.slug}
                  </TableCell>

                  {/* Description */}
                  <TableCell
                    sx={{ color: "#6b7280", fontSize: "13px", maxWidth: 260 }}
                  >
                    <Typography noWrap sx={{ fontSize: "13px" }}>
                      {row.description || "—"}
                    </Typography>
                  </TableCell>

                  {/* Status Badge */}
                  <TableCell>
                    <Chip
                      size="small"
                      label={row.status}
                      sx={{
                        fontSize: "12px",
                        fontWeight: 600,
                        borderRadius: "99px",
                        bgcolor:
                          row.status === "Active" ? "#dcfce7" : "#fee2e2",
                        color: row.status === "Active" ? "#16a34a" : "#dc2626",
                      }}
                    />
                  </TableCell>

                  {/* Actions */}
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      onClick={() => handleOpenEdit(row)}
                      sx={{ color: "#2563eb", mr: 0.5 }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(row._id)}
                      sx={{ color: "#dc2626" }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add / Edit Category Dialog Modal */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        fullWidth
        maxWidth="sm"
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
          {editingCategory ? "Edit Category" : "Add New Category"}
          <IconButton onClick={handleCloseModal} size="small">
            <CloseIcon fontSize="small" />
          </IconButton>
        </DialogTitle>

        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent dividers sx={{ borderColor: "#e5e7eb" }}>
            {CategoryInputFields.map((field) => (
              <DynamicCategoryInput
                key={field.name}
                field={field}
                register={register}
                errors={errors}
                setValue={setValue}
                defaultImageUrl={editingCategory?.image}
              />
            ))}
          </DialogContent>

          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button
              onClick={handleCloseModal}
              disabled={btnLoading}
              sx={{
                color: "#6b7280",
                textTransform: "none",
                fontWeight: 600,
              }}
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
              ) : editingCategory ? (
                "Update Category"
              ) : (
                "Save Category"
              )}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};
export default AdminCategory;
