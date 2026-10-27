import axios from "axios";
import Cookies from "js-cookie";
import type { ICarItem } from "./carService";
import Endpoint from "./heper/endpoint";


const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const getAuthHeaders = () => {
  const token = Cookies.get("token");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

export interface IBookingPayload {
  carId: string;
  pickupDate: string;
  dropoffDate: string;
  fullName: string;
  phone: string;
  drivingLicense: string;
  address?: string;
}

export interface IBookingItem {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  car: ICarItem;
  pickupDate: string;
  dropoffDate: string;
  totalDays: number;
  totalPrice: number;
  status: "Pending" | "Approved" | "Rejected" | "Completed" | "Cancelled";
  customerDetails: {
    fullName: string;
    phone: string;
    drivingLicense: string;
    address?: string;
  };
  adminNote?: string;
  createdAt: string;
}

export const bookingService = {
  // 1. Create Booking (Logged-in Customer)
  createBooking: async (payload: IBookingPayload): Promise<IBookingItem> => {
    const res = await axios.post(
      `${BASE_URL}${Endpoint.bookings.create}`,
      payload,
      { headers: getAuthHeaders() }
    );
    return res.data?.booking || res.data;
  },

  // 2. Customer's Own Bookings
  getMyBookings: async (): Promise<IBookingItem[]> => {
    const res = await axios.get(`${BASE_URL}${Endpoint.bookings.myBookings}`, {
      headers: getAuthHeaders(),
    });
    return res.data?.bookings || [];
  },

  // 3. Admin: Get All Bookings
  getAllBookings: async (status?: string): Promise<IBookingItem[]> => {
    const res = await axios.get(`${BASE_URL}${Endpoint.bookings.adminAll}`, {
      params: status ? { status } : {},
      headers: getAuthHeaders(),
    });
    return res.data?.bookings || [];
  },

  // 4. Admin: Approve or Reject Booking
  updateStatus: async (
    id: string,
    status: string,
    adminNote?: string
  ): Promise<IBookingItem> => {
    const res = await axios.put(
      `${BASE_URL}${Endpoint.bookings.adminStatus(id)}`,
      { status, adminNote },
      { headers: getAuthHeaders() }
    );
    return res.data?.booking || res.data;
  },
};

export default bookingService;