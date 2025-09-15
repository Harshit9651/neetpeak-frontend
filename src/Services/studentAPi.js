// services/studentApi.js
import { API_ENDPOINTS } from "../utils/constants/api";
import { fetchWithAuth } from "../../helper/fetchWithAuth";
import { fetchMultipartWithAuth } from "../../helper/fetchwithmultipartAuth";
import { useAuth } from "../context/authContext";

export const useStudentApi = {
  registerStudent: async (data) => {
    return await fetchWithAuth(API_ENDPOINTS.directStudent.studentSignup, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  verifyStudentOtp: async (data) => {
    return await fetchWithAuth(API_ENDPOINTS.directStudent.verifyOtp, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  resendOtp: async (data) => {
    return await fetchWithAuth(API_ENDPOINTS.directStudent.resendOtp, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  loginStudent: async (data) => {
    return await fetchWithAuth(API_ENDPOINTS.directStudent.loginStudent, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  getCollegeCourses: async (collegeId) => {
    try {
      const data = await fetchWithAuth(
        `${API_ENDPOINTS.getData.getcollegeCourese}?collegeId=${collegeId}`,
        { method: "GET" }
      );

      console.log("college course data is :", data.courses);
      return data;
    } catch (error) {
      console.error("Error in getCollegeCourses API:", error);
      throw error;
    }
  },
  registercollegeStudent: async (data) => {
    return await fetchWithAuth(API_ENDPOINTS.collegeStudent.studentSignup, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  getStudentData: async (studentId) => {
    try {
      const data = await fetchWithAuth(
        `${API_ENDPOINTS.getData.getStudentData}?studentId=${studentId}`,
        { method: "GET" }
      );

      return data;
    } catch (error) {
      console.error("Error in getStudentData API:", error);
      throw error;
    }
  },
  sendUserQuary: async (formData) => {
    try {
     const response = await fetch(API_ENDPOINTS.other.sendQuaryToAdmin, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
 const data = await response.json(); // ✅ Parse JSON first

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Failed to send query");
    }

    return data;

    return data;
    } catch (error) {
      console.error("Error :", error);
      throw error;
    }
  },
  markAttendance: async (qrData, representativeId) => {
    try {
      const data = await fetchWithAuth(
        `${API_ENDPOINTS.other.markAttendance}`,
        {
          method: "POST",
          body: JSON.stringify({ qrData, representativeId }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Mark Attendance API Response:", data);
      return data;
    } catch (error) {
      console.error("Error in markAttendance API:", error);
      throw error;
    }
  },
  uploadProfileImage: async (formData) => {
    try {
      console.log("Uploading profile image with formData:", formData);
      const data = await fetchMultipartWithAuth(
        API_ENDPOINTS.other.uploadProfileImage,
        formData
      );

      return data;
    } catch (error) {
      console.error("Error in uploadProfileImage API:", error);
      throw error;
    }
  },
  updateStudentProfile: async (payload) => {
    try {
      console.log("hii7");
      const data = await fetchWithAuth(
        API_ENDPOINTS.other.updateStudentProfile,
        {
          method: "POST",
          body: JSON.stringify({ payload }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Update Student Profile API Response:", data);
      console.log("hii8");
      return data;
    } catch (error) {
      console.error("Error in updateStudentProfile API:", error);
      throw error;
    }
  },
  updateStudentdata: async (payload) => {
    try {
      const data = await fetchWithAuth(
        `${API_ENDPOINTS.other.updateStudentProfile}`,
        {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Mark Attendance API Response:", data);
      return data;
    } catch (error) {
      console.error("Error in markAttendance API:", error);
      throw error;
    }
  },
  fetchStudentAttendance: async (userId) => {
    return await fetchWithAuth(API_ENDPOINTS.getData.getStudnetAttendance, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });
  },
  studentForgotPassword: async (email) => {

    try {
      const res = await fetchWithAuth(API_ENDPOINTS.directStudent.forgotPassword, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email}),
      });
      
      return res;
      
    } catch (err) {
      console.error("Error in markAttendance API:", err);
      throw err;
    }
  },
  verifyForgotPasswordOTP:async({token,otp})=>{
     try {
      const res = await fetchWithAuth(API_ENDPOINTS.directStudent.verifyForgotPasswordOTP, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token,otp }),
      });
 
      return res;
      
    } catch (err) {
      console.error("Error in markAttendance API:", err);
      throw err;
    }
  },
  updateForgotPassword:async({token,email,newPassword })=>{
     try {
      const res = await fetchWithAuth(API_ENDPOINTS.directStudent.updateForgotPassword, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({token,email,newPassword }),
      });
     
      return res;
      
    } catch (err) {
      console.error("Error in markAttendance API:", err);
      throw err;
    }
},
changePassword:async({currentPassword,newPassword,studentType,StudentId})=>{
  console.log("hii ye data ja ",currentPassword,newPassword,studentType,StudentId)
     try {
      const res = await fetchWithAuth(API_ENDPOINTS.directStudent.ChangeStudentPassword, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ currentPassword,
        newPassword,studentType,StudentId}),
      });

      return res;
      
    } catch (err) {
      console.error("Error in ChangePaaword API:", err);
      throw err;
    }
},
 AddUserComment: async (payload) => {
    try {
      const data = await fetchWithAuth(API_ENDPOINTS.other.sendUserComment
       ,
         {
        method: "POST",                    
        body: JSON.stringify(payload),     
      }
      );

      return data;
    } catch (error) {
      console.error("Error in uploadProfileImage API:", error);
      throw error;
    }
  },
  getBlogComments: async (id) => {
    try {
      const data = await fetchWithAuth(
        `${API_ENDPOINTS.other.getComments}/${id}`,
        { method: "GET" }
      );

      return data;
    } catch (error) {
      console.error("Error in getStudentData API:", error);
      throw error;
    }
  },
}
