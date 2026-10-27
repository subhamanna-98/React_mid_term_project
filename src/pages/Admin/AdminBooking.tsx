



import React, { useEffect, useState, useMemo } from "react";
import {
  Box,
  Typography,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  IconButton,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Tooltip,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "sonner";
import { bookingService, type IBookingItem } from "../../services/bookingService";



const AdminBooking: React.FC = () => {
  const [bookings, setBookings] = useState<IBookingItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [btnLoading, setBtnLoading] = useState<boolean>(false);

  // Status Change Modal State (Rejection note ba Approval note-er jonno)
  const [statusModal, setStatusModal] = useState<{
    open: boolean;
    bookingId: string;
    action: "Approved" | "Rejected" | "";
    note: string;
  }>({
    open: false,
    bookingId: "",
    action: "",
    note: "",
  });

  // Details View Modal State
  const [viewBooking, setViewBooking] = useState<IBookingItem | null>(null);

  // Fetch all bookings
  const fetchBookings = async () => {
    try {
      setLoading(true);
      const data = await bookingService.getAllBookings();
      setBookings(Array.isArray(data) ? data : []);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Filter Bookings by Status
  const filteredBookings = useMemo(() => {
    if (!Array.isArray(bookings)) return [];
    if (selectedFilter === "All") return bookings;
    return bookings.filter((b) => b.status === selectedFilter);
  }, [bookings, selectedFilter]);

  // Open Status Confirmation Modal
  const handleOpenStatusModal = (
    bookingId: string,
    action: "Approved" | "Rejected"
  ) => {
    setStatusModal({
      open: true,
      bookingId,
      action,
      note: action === "Approved" ? "Booking confirmed by admin." : "",
    });
  };

  // Close Status Modal
  const handleCloseStatusModal = () => {
    setStatusModal({
      open: false,
      bookingId: "",
      action: "",
      note: "",
    });
  };

  // Submit Status Change (Approve / Reject)
  const handleStatusSubmit = async () => {
    if (!statusModal.bookingId || !statusModal.action) return;

    try {
      setBtnLoading(true);
      await bookingService.updateStatus(
        statusModal.bookingId,
        statusModal.action,
        statusModal.note
      );

      toast.success(`Booking successfully ${statusModal.action.toLowerCase()}`);
      handleCloseStatusModal();
      fetchBookings(); // Refresh list to get updated statuses
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to update booking status"
      );
    } finally {
      setBtnLoading(false);
    }
  };

  // Helper for Status Badge Color
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Approved":
        return { bg: "#dcfce7", color: "#16a34a" };
      case "Pending":
        return { bg: "#fef3c7", color: "#d97706" };
      case "Rejected":
      case "Cancelled":
        return { bg: "#fee2e2", color: "#dc2626" };
      case "Completed":
        return { bg: "#e0e7ff", color: "#4f46e5" };
      default:
        return { bg: "#f3f4f6", color: "#6b7280" };
    }
  };

  return (
    <Box>
      {/* Top Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: "#111827" }}>
          Rental Bookings Management
        </Typography>
        <Typography variant="body2" sx={{ color: "#6b7280" }}>
          Review rental requests, verify driving credentials, and confirm reservations
        </Typography>
      </Box>

      {/* Filter Tabs */}
      <Box sx={{ display: "flex", gap: 1, mb: 2.5, flexWrap: "wrap" }}>
        {["All", "Pending", "Approved", "Rejected", "Completed"].map((tab) => (
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

      {/* Bookings Table */}
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
        <Table sx={{ minWidth: 900 }}>
          <TableHead sx={{ bgcolor: "#fafafa" }}>
            <TableRow>
              <TableCell sx={{ color: "#6b7280", fontWeight: 600, fontSize: "12px" }}>
                CUSTOMER
              </TableCell>
              <TableCell sx={{ color: "#6b7280", fontWeight: 600, fontSize: "12px" }}>
                VEHICLE
              </TableCell>
              <TableCell sx={{ color: "#6b7280", fontWeight: 600, fontSize: "12px" }}>
                RENTAL DATES
              </TableCell>
              <TableCell sx={{ color: "#6b7280", fontWeight: 600, fontSize: "12px" }}>
                DURATION
              </TableCell>
              <TableCell sx={{ color: "#6b7280", fontWeight: 600, fontSize: "12px" }}>
                TOTAL AMOUNT
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
                    Loading reservations...
                  </Typography>
                </TableCell>
              </TableRow>
            ) : filteredBookings.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
                  <Typography variant="body1" sx={{ color: "#6b7280" }}>
                    No bookings found in this category.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredBookings.map((b) => {
                const statusStyle = getStatusStyle(b.status);
                const pickup = new Date(b.pickupDate).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                });
                const dropoff = new Date(b.dropoffDate).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                });

                return (
                  <TableRow
                    key={b._id}
                    hover
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    {/* Customer Info */}
                    <TableCell>
                      <Typography sx={{ fontWeight: 600, color: "#111827", fontSize: "14px" }}>
                        {b.customerDetails?.fullName || b.user?.name || "Customer"}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "#6b7280", display: "block" }}>
                        Ph: {b.customerDetails?.phone}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "#94a3b8", fontSize: "11px" }}>
                        DL: {b.customerDetails?.drivingLicense}
                      </Typography>
                    </TableCell>

                    {/* Vehicle Info */}
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <Avatar
                          src={b.car?.image}
                          variant="rounded"
                          sx={{
                            width: 48,
                            height: 36,
                            borderRadius: "6px",
                            bgcolor: "#e2e8f0",
                          }}
                        >
                          🚗
                        </Avatar>
                        <Box>
                          <Typography sx={{ fontWeight: 600, color: "#111827", fontSize: "13px" }}>
                            {b.car?.name || "Vehicle"}
                          </Typography>
                          <Typography variant="caption" sx={{ color: "#6b7280", fontFamily: "monospace" }}>
                            {b.car?.registrationNo}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    {/* Rental Dates */}
                    <TableCell sx={{ color: "#374151", fontSize: "13px" }}>
                      {pickup} → {dropoff}
                    </TableCell>

                    {/* Duration */}
                    <TableCell sx={{ color: "#6b7280", fontSize: "13px" }}>
                      {b.totalDays} Day{b.totalDays > 1 ? "s" : ""}
                    </TableCell>

                    {/* Total Price */}
                    <TableCell sx={{ fontWeight: 700, color: "#111827", fontSize: "14px" }}>
                      ₹{b.totalPrice}
                    </TableCell>

                    {/* Status Badge */}
                    <TableCell>
                      <Chip
                        size="small"
                        label={b.status}
                        sx={{
                          fontSize: "12px",
                          fontWeight: 600,
                          borderRadius: "99px",
                          bgcolor: statusStyle.bg,
                          color: statusStyle.color,
                        }}
                      />
                    </TableCell>

                    {/* Actions: View Details, Approve, Reject */}
                    <TableCell align="right" sx={{ whiteSpace: "nowrap" }}>
                      {/* View Details */}
                      <Tooltip title="View Details">
                        <IconButton
                          size="small"
                          onClick={() => setViewBooking(b)}
                          sx={{
                            color: "#475569",
                            bgcolor: "#f1f5f9",
                            mr: 0.5,
                            borderRadius: "6px",
                            "&:hover": { bgcolor: "#e2e8f0" },
                          }}
                        >
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>

                      {/* Pending state-e Approve ebong Reject controls thakbe */}
                      {b.status === "Pending" && (
                        <>
                          <Tooltip title="Approve Booking">
                            <IconButton
                              size="small"
                              onClick={() => handleOpenStatusModal(b._id, "Approved")}
                              sx={{
                                color: "#16a34a",
                                bgcolor: "#dcfce7",
                                mr: 0.5,
                                borderRadius: "6px",
                                "&:hover": { bgcolor: "#bbf7d0" },
                              }}
                            >
                              <CheckCircleIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>

                          <Tooltip title="Reject Booking">
                            <IconButton
                              size="small"
                              onClick={() => handleOpenStatusModal(b._id, "Rejected")}
                              sx={{
                                color: "#dc2626",
                                bgcolor: "#fee2e2",
                                borderRadius: "6px",
                                "&:hover": { bgcolor: "#fecaca" },
                              }}
                            >
                              <CancelIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 1. Status Change Modal (Approve / Reject Confirmation) */}
      <Dialog
        open={statusModal.open}
        onClose={handleCloseStatusModal}
        fullWidth
        maxWidth="xs"
        slotProps={{
          paper: { sx: { borderRadius: "12px", p: 1 } },
        }}
      >
        <DialogTitle sx={{ fontWeight: 700, pb: 1, color: "#111827" }}>
          {statusModal.action === "Approved" ? "Approve Booking" : "Reject Booking"}
        </DialogTitle>

        <DialogContent dividers sx={{ borderColor: "#e5e7eb" }}>
          <Typography variant="body2" sx={{ color: "#4b5563", mb: 2 }}>
            {statusModal.action === "Approved"
              ? "Confirming this reservation will reserve the vehicle and mark its status as 'Rented'."
              : "Are you sure you want to decline this rental request?"}
          </Typography>

          <TextField
            label="Admin Note (Optional)"
            placeholder={
              statusModal.action === "Approved"
                ? "e.g. Pickup scheduled at hub"
                : "e.g. License unverified or vehicle maintenance"
            }
            multiline
            rows={2}
            fullWidth
            value={statusModal.note}
            onChange={(e) =>
              setStatusModal((prev) => ({ ...prev, note: e.target.value }))
            }
          />
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button
            onClick={handleCloseStatusModal}
            disabled={btnLoading}
            sx={{ color: "#6b7280", textTransform: "none", fontWeight: 600 }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleStatusSubmit}
            variant="contained"
            disabled={btnLoading}
            sx={{
              bgcolor: statusModal.action === "Approved" ? "#16a34a" : "#dc2626",
              borderRadius: "8px",
              textTransform: "none",
              fontWeight: 600,
              px: 2.5,
              "&:hover": {
                bgcolor: statusModal.action === "Approved" ? "#15803d" : "#b91c1c",
              },
            }}
          >
            {btnLoading ? (
              <CircularProgress size={20} color="inherit" />
            ) : statusModal.action === "Approved" ? (
              "Confirm Approval"
            ) : (
              "Reject Request"
            )}
          </Button>
        </DialogActions>
      </Dialog>

      {/* 2. View Booking Full Details Dialog */}
      <Dialog
        open={!!viewBooking}
        onClose={() => setViewBooking(null)}
        fullWidth
        maxWidth="sm"
        slotProps={{
          paper: { sx: { borderRadius: "16px", p: 1 } },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontWeight: 700,
          }}
        >
          Booking Information
          <IconButton onClick={() => setViewBooking(null)} size="small">
            <CloseIcon fontSize="small" />
          </IconButton>
        </DialogTitle>

        {viewBooking && (
          <DialogContent dividers sx={{ borderColor: "#e5e7eb" }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {/* Car Overview */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  p: 1.5,
                  borderRadius: "8px",
                  bgcolor: "#f8fafc",
                }}
              >
                <img
                  src={viewBooking.car?.image}
                  alt={viewBooking.car?.name}
                  style={{
                    width: 80,
                    height: 55,
                    objectFit: "cover",
                    borderRadius: "6px",
                  }}
                />
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                    {viewBooking.car?.name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#64748b" }}>
                    Reg: {viewBooking.car?.registrationNo} • Rate: ₹
                    {viewBooking.car?.pricePerDay}/day
                  </Typography>
                </Box>
              </Box>

              {/* Customer Information */}
              <Box>
                <Typography variant="caption" sx={{ color: "#94a3b8", fontWeight: 700 }}>
                  CUSTOMER DETAILS
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, mt: 0.5 }}>
                  {viewBooking.customerDetails?.fullName} ({viewBooking.user?.email})
                </Typography>
                <Typography variant="body2" sx={{ color: "#475569" }}>
                  Phone: {viewBooking.customerDetails?.phone}
                </Typography>
                <Typography variant="body2" sx={{ color: "#475569" }}>
                  License: {viewBooking.customerDetails?.drivingLicense}
                </Typography>
                {viewBooking.customerDetails?.address && (
                  <Typography variant="body2" sx={{ color: "#475569" }}>
                    Address: {viewBooking.customerDetails?.address}
                  </Typography>
                )}
              </Box>

              {/* Rental Schedule & Total */}
              <Box sx={{ p: 2, borderRadius: "8px", bgcolor: "#eff6ff" }}>
                <Typography variant="caption" sx={{ color: "#1e3a8a", fontWeight: 700 }}>
                  SCHEDULE & INVOICE
                </Typography>
                <Typography variant="body2" sx={{ mt: 0.5, color: "#1e293b" }}>
                  Dates: {new Date(viewBooking.pickupDate).toLocaleDateString()} to{" "}
                  {new Date(viewBooking.dropoffDate).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" sx={{ color: "#1e293b" }}>
                  Total Duration: {viewBooking.totalDays} Day(s)
                </Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#2563eb", mt: 1 }}>
                  Total Price: ₹{viewBooking.totalPrice}
                </Typography>
              </Box>
            </Box>
          </DialogContent>
        )}
      </Dialog>
    </Box>
  );
};

export default AdminBooking