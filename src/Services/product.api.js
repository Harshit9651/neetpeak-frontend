// services/studentApi.js
import { API_ENDPOINTS } from "../utils/constants/api";
import { fetchWithAuth } from "../../helper/fetchWithAuth";
import { fetchMultipartWithAuth } from "../../helper/fetchwithmultipartAuth";
import { useAuth } from "../context/authContext";

export const useProductApi = {
  getProducts: async () => {
    const token = localStorage.getItem("token");
    try {
      const data = await fetchWithAuth(
        `${API_ENDPOINTS.products.getProducts}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (error) {
      throw error;
    }
  },
  getProductbyId: async (id) => {
    const token = localStorage.getItem("token");
    try {
      const data = await fetchWithAuth(
        `${API_ENDPOINTS.products.getProductById}/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return data;
    } catch (error) {
      throw error;
    }
  },
  validatePromo: async (data) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetchWithAuth(API_ENDPOINTS.other.validatePromo, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response) return;
      return response;
    } catch (error) {
      throw error;
    }
  },
  createOrder: async (data) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetchWithAuth(API_ENDPOINTS.Payment.createOrder, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response) return;
      return response;
    } catch (error) {
      throw error;
    }
  },
  verifyRazorpayPayment: async (data) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetchWithAuth(API_ENDPOINTS.Payment.verifyorder, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response) return;
      return response;
    } catch (error) {
      throw error;
    }
  },

  createProductOrder: async (data) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetchWithAuth(
        API_ENDPOINTS.Payment.createProductOrder,
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response) return;
      return response;
    } catch (error) {
      throw error;
    }
  },
  verifyRazorpayProductPayment: async (data) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetchWithAuth(
        API_ENDPOINTS.Payment.verifyProductOrder,
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response) return;
      return response;
    } catch (error) {
      throw error;
    }
  },
};
