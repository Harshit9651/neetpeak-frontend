// services/studentApi.js
import { API_ENDPOINTS } from "../utils/constants/api";
import { fetchWithAuth } from "../../helper/fetchWithAuth";
import { fetchMultipartWithAuth } from "../../helper/fetchwithmultipartAuth";
import { useAuth } from "../context/authContext";

export const useCartApi = {
  addToCart: async (userId, productId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetchWithAuth(API_ENDPOINTS.Cart.addToCart, {
        method: "POST",
        body: JSON.stringify({ userId, productId }),
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
  getcart: async (userId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetchWithAuth(
        `${API_ENDPOINTS.Cart.getCart}/${userId}`,
        {
          method: "GET",
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
  removeFromCart: async (userId, productId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetchWithAuth(
        `${API_ENDPOINTS.Cart.removeFromCart}/${userId}/${productId}`,
        {
          method: "DELETE",
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
  updateQuintity: async (userId, productId, quantity) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetchWithAuth(API_ENDPOINTS.Cart.updateCart, {
        method: "PUT",
        body: JSON.stringify({ userId, productId, quantity }),
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
};
