const API_URL = import.meta.env.VITE_API_URL;
export const API_ENDPOINTS = {
  directStudent: {
    studentSignup: `${API_URL}/api/v1/student/student/DirectStduentRegister`,
    verifyOtp: `${API_URL}/api/v1/student/student/Verify-otp`,
    resendOtp: `${API_URL}/api/v1/student/student/Resend-otp`,
    loginStudent: `${API_URL}/api/v1/student/student/DirectStudentLogin`,
    forgotPassword: `${API_URL}/api/v1/student/student/forgotPassword`,
    verifyForgotPasswordOTP: `${API_URL}/api/v1/student/student/Verify-forgotPassword-Otp`,
    updateForgotPassword: `${API_URL}/api/v1/student/student/Update-forgotPassword`,
    ChangeStudentPassword: `${API_URL}/api/v1/student/student/Change-StudentPassword`,
  },
  products: {
    getProducts: `${API_URL}/api/v1/Product/ManageProduct/getProducts`,
    getProductById: `${API_URL}/api/v1/Product/ManageProduct/getProductById`,
  },
  Cart: {
    addToCart: `${API_URL}/api/v1/Cart/ManageCart/addToCart`,
    getCart: `${API_URL}/api/v1/Cart/ManageCart/getCart`,
    removeFromCart: `${API_URL}/api/v1/Cart/ManageCart/removeFromCart`,
    updateCart: `${API_URL}/api/v1/Cart/ManageCart/updateCart`,
  },

  getData: {
    getcollegeCourese: `${API_URL}/api/v1/college/college/getcollegecourses`,
    getStudentData: `${API_URL}/api/v1/student/student/getStudentData`,
    getStudnetAttendance: `${API_URL}/api/v1/student/student-attendance/getStudentCRTAttendance`,
  },
  other: {
    testApi: `${API_URL}/test`,
    markAttendance: `${API_URL}/api/v1/student/student-attendance/mark-attendance`,
    uploadProfileImage: `${API_URL}/api/v1/student/student/upload-profile-image`,
    updateStudentProfile: `${API_URL}/api/v1/student/student/updateStudentData`,
    sendQuaryToAdmin: `${API_URL}/api/v1/admin/Auth_Admin/sendUserQuaryToAdmin`,
    sendUserComment: `${API_URL}/api/v1/Comments/Manage-Comments/sendUserComment`,
    getComments: `${API_URL}/api/v1/Comments/Manage-Comments/get-comments`,
    getCourses: `${API_URL}/api/v1/courses/ManageCourses/getCourses`,
    listAllCourses: `${API_URL}/api/v1/courses/ManageCourses/listAllCourses`,
    getCourseById: `${API_URL}/api/v1/courses/ManageCourses/getCourseDetails`,
    validatePromo: `${API_URL}/api/v1/PromoCode/ManagePromocode/validatePromoCode`,
    getCourseByStudentId: `${API_URL}/api/v1/courses/ManageCourses/getCourseByStudentId`,
    getCourseVideos: `${API_URL}/api/v1/courses/ManageCourses/getCourseVideos`,
    markVideoAsWatched: `${API_URL}/api/v1/courses/ManageCourses/markVideoasWatched`,
    getCourseProgress: `${API_URL}/api/v1/courses/ManageCourses/progressDashboard`,
    getStudentCoursesSummary: `${API_URL}/api/v1/courses/ManageCourses/getStudentCoursesSummary`,
  },
  Payment: {
    createOrder: `${API_URL}/api/v1/Payment/ManagePayment/createOrder`,
    verifyorder: `${API_URL}/api/v1/Payment/ManagePayment/verifyPayment`,
    createProductOrder: `${API_URL}/api/v1/Payment/ManageProductPayment/createProductOrder`,
    verifyProductOrder: `${API_URL}/api/v1/Payment/ManageProductPayment/verifyProductPayment`,
    mentorshipCallBookingOrder: `${API_URL}/api/v1/mentorshipCallBook/ManageMentorshipCallBook/createOrder`,
    verifyMentorshipCallOrder: `${API_URL}/api/v1/mentorshipCallBook/ManageMentorshipCallBook/verifyPayment`,
  },
  mentorship: {
    listMentorshipPlan: `${API_URL}/api/v1/Mentorship/ManageMentorship/getMentorshipPlan`,
  },
};

export const ERROR = {
  LOGIN_FAILED: "Login failed. Please check your credentials.",
  SIGNUP_FAILED: "Signup failed. Please try again.",
};
