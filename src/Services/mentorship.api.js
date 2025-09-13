// services/studentApi.js
import { API_ENDPOINTS } from "../utils/constants/api";
import { fetchWithAuth } from "../../helper/fetchWithAuth";
import { fetchMultipartWithAuth } from "../../helper/fetchwithmultipartAuth";
import { useAuth } from "../context/authContext";

export const useMentorshipApi = {
  getMentorshipPlan: async () => {
    try {
      let url = API_ENDPOINTS.mentorship.listMentorshipPlan;

      const response = await fetchWithAuth(url, {
        method: "GET",
      });

      if (!response) return;

      return response;
    } catch (error) {
      throw error;
    }
  },
};
