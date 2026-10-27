import axios from "axios";
import Cookies from "js-cookie";
import Endpoint from "./heper/endpoint";


const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const getAuthHeaders = (isFormData: boolean = false) => {
  const token = Cookies.get("token");
  return {
    Authorization: `Bearer ${token}`,
    ...(isFormData ? { "Content-Type": "multipart/form-data" } : {}),
  };
};

export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image: string;
  imagePublicId?: string;
  status: "Active" | "Inactive";
  createdAt?: string;
}

export const categoryService = {
  // Get all categories
  getAllCategories: async (): Promise<ICategory[]> => {
    const res = await axios.get(`${BASE_URL}${Endpoint.categories.list}`);
    // Backend theke direct "categories" key ashche
    return res.data?.categories || res.data?.data || res.data || [];
  },

  // Create new category
  createCategory: async (formData: FormData): Promise<ICategory> => {
    const res = await axios.post(
      `${BASE_URL}${Endpoint.categories.create}`,
      formData,
      { headers: getAuthHeaders(true) }
    );
    return res.data?.category || res.data?.data || res.data;
  },

  // Update category
  updateCategory: async (id: string, formData: FormData): Promise<ICategory> => {
    const res = await axios.put(
      `${BASE_URL}${Endpoint.categories.update(id)}`,
      formData,
      { headers: getAuthHeaders(true) }
    );
    return res.data?.category || res.data?.data || res.data;
  },

  // Delete category
  deleteCategory: async (id: string): Promise<void> => {
    await axios.delete(`${BASE_URL}${Endpoint.categories.delete(id)}`, {
      headers: getAuthHeaders(),
    });
  },
};