// services/studentApi.js
import { API_ENDPOINTS } from "../utils/constants/api";
import { fetchWithAuth } from "../../helper/fetchWithAuth";
import { fetchMultipartWithAuth } from "../../helper/fetchwithmultipartAuth";
import { useAuth } from "../context/authContext";

export const useCourseApi = {
  getCollegeCourses: async (collegeId) => {
    try {
      const data = await fetchWithAuth(`${API_ENDPOINTS.other.getCourses}`, {
        method: "GET",
      });
      return data;
    } catch (error) {
      throw error;
    }
  },
  listAllCourses: async (collegeId) => {
    const token = localStorage.getItem("token");
    try {
      const data = await fetchWithAuth(
        `${API_ENDPOINTS.other.listAllCourses}`,
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
  getCourseById: async (courseId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetchWithAuth(
        `${API_ENDPOINTS.other.getCourseById}/${courseId}`,
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
  getStudentCoursesSummary: async (studentId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetchWithAuth(
        `${API_ENDPOINTS.other.getStudentCoursesSummary}/${studentId}`,
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
  getCourseProgress: async (userId, courseId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetchWithAuth(
        `${API_ENDPOINTS.other.getCourseProgress}/${userId}/course/${courseId}`,
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
  getPurchasedCourses: async (studentId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetchWithAuth(
        `${API_ENDPOINTS.other.getCourseByStudentId}/${studentId}`,
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
  getCourseVideos: async (courseId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetchWithAuth(
        `${API_ENDPOINTS.other.getCourseVideos}?courseId=${courseId}`,
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
  markVideoAsWatched: async (data) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetchWithAuth(
        API_ENDPOINTS.other.markVideoAsWatched,
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
  verifyStudentOtp: async (data) => {
    return await fetchWithAuth(API_ENDPOINTS.directStudent.verifyOtp, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};
