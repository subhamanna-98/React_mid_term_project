import axios from "axios";
import Cookies from "js-cookie";
import Endpoint from "./heper/endpoint";
;

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const getAuthHeaders = (isFormData: boolean = false) => {
  const token = Cookies.get("token");
  return {
    Authorization: `Bearer ${token}`,
    ...(isFormData ? { "Content-Type": "multipart/form-data" } : {}),
  };
};

export interface ICarItem {
  _id: string;
  name: string;
  slug: string;
  registrationNo: string;
  category: {
    _id: string;
    name: string;
    slug?: string;
  } | string;
  fuelType: "Petrol" | "Diesel" | "CNG" | "EV";
  transmission: "Manual" | "Automatic";
  seats: number;
  pricePerDay: number;
  status: "Available" | "Rented" | "Maintenance";
  image: string;
  imagePublicId?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ICarQueryParams {
  status?: string;
  category?: string;
  search?: string;
}

export const carService = {
  // 1. Get all cars (With optional filters)
  getAllCars: async (params?: ICarQueryParams): Promise<ICarItem[]> => {
    const res = await axios.get(`${BASE_URL}${Endpoint.cars.list}`, {
      params,
      headers: { "Cache-Control": "no-cache" },
    });
    return res.data?.cars || res.data?.data || res.data || [];
  },

  // 2. Get single car details (By ID or Slug)
  getCarDetails: async (identifier: string): Promise<ICarItem> => {
    const res = await axios.get(`${BASE_URL}${Endpoint.cars.details(identifier)}`);
    return res.data?.car || res.data?.data || res.data;
  },

  // 3. Create new car (Admin Protected with Multipart FormData)
  createCar: async (formData: FormData): Promise<ICarItem> => {
    const res = await axios.post(
      `${BASE_URL}${Endpoint.cars.create}`,
      formData,
      { headers: getAuthHeaders(true) }
    );
    return res.data?.car || res.data?.data || res.data;
  },

  // 4. Update car (Admin Protected)
  updateCar: async (id: string, formData: FormData): Promise<ICarItem> => {
    const res = await axios.put(
      `${BASE_URL}${Endpoint.cars.update(id)}`,
      formData,
      { headers: getAuthHeaders(true) }
    );
    return res.data?.car || res.data?.data || res.data;
  },

  // 5. Delete car (Admin Protected)
  deleteCar: async (id: string): Promise<void> => {
    await axios.delete(`${BASE_URL}${Endpoint.cars.delete(id)}`, {
      headers: getAuthHeaders(),
    });
  },
};

export default carService;