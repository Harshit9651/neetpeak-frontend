import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import {useStudentApi} from '../../../Services/studentAPi'
import { useNavigate } from "react-router-dom";

const inputVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function ForgotPassword() {
  const [step, setStep] = useState(1); // 1 = email, 2 = password reset
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // OTP states
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const otpRefs = useRef([]);
  const [timeLeft, setTimeLeft] = useState(300); 
  const [otpLoading, setOtpLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [tempToken, setTempToken] = useState(null);
  const [emailLoading, setEmailLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
 const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });


  const validateEmail = () => {
    let tempErrors = {};
    if (!formData.email) tempErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      tempErrors.email = "Email is invalid";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };


  const validatePasswords = () => {
    let tempErrors = {};
    if (!formData.password) tempErrors.password = "Password is required";
    if (!formData.confirmPassword)
      tempErrors.confirmPassword = "Confirm password is required";
    else if (formData.password !== formData.confirmPassword)
      tempErrors.confirmPassword = "Passwords do not match";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };


const handleEmailSubmit = async (e) => {
  e.preventDefault();
  if (validateEmail()) {
    try {
      setEmailLoading(true);
      toast.loading("Sending OTP...");
      const res = await useStudentApi.studentForgotPassword(formData.email);
      toast.dismiss();

      if (res.success) {
        setTempToken(res.data.token); 
        toast.success("OTP sent to your email!");
        setShowOtpModal(true);
        setTimeLeft(300);
        setEmailLoading(false);
      } else {
        toast.error(res.message || "Failed to send OTP. Try again!");
        setEmailLoading(false);
      }
    } catch (err) {
      setEmailLoading(false);
      toast.dismiss();
      toast.error("Something went wrong. Try again!");
    }
  }
};
const handlePasswordSubmit = async (e) => {
  e.preventDefault();

  if (!validatePasswords()) return;

  const toastId = toast.loading("Updating password...");
  try {
    setPasswordLoading(true);
    const res = await useStudentApi.updateForgotPassword({
      email: formData.email.trim(),
      newPassword: formData.confirmPassword.trim(), 
    });

    toast.dismiss(toastId);

    if (res?.success) {
      setPasswordLoading(false);
      toast.success(res.message || "Password reset successful!");
      setFormData({ email: "", password: "", confirmPassword: "" });
      navigate("/signin");
    } else {
      setPasswordLoading(false);
      toast.error(res?.message || "Failed to update password");
    }
  } catch (err) {
    setPasswordLoading(false);
    toast.dismiss(toastId);
    toast.error(err?.message || "Something went wrong!");
    console.error("updateForgotPassword error:", err);
  }
};

 
  const handleOtpChange = (value, idx) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[idx] = value;
    setOtp(newOtp);
    if (value && idx < otp.length - 1) {
      otpRefs.current[idx + 1].focus();
    }
  };

  const handleOtpKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      otpRefs.current[idx - 1].focus();
    }
  };

const handleOtpSubmit = async () => {
  setOtpLoading(true);
  try {
    const res = await useStudentApi.verifyForgotPasswordOTP({
      token: tempToken,          
      otp: otp.join(""),
    });

    if (res.success) {
      setShowOtpModal(false);
      setStep(2);
      toast.success("OTP verified!");
    } else {
      setOtpError(res.message || "Invalid OTP. Try again!");
    }
  } finally {
    setOtpLoading(false);
  }
};


  const handleResendOtp = async () => {
    setResendLoading(true);
    try {
      setOtp(["", "", "", ""]);
      setTimeLeft(300);
      toast.success("OTP resent!");
    } catch {
      toast.error("Failed to resend OTP");
    } finally {
      setResendLoading(false);
    }
  };
  useEffect(() => {
    let timer;
    if (showOtpModal && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [timeLeft, showOtpModal]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <section className="relative w-full flex justify-center items-center min-h-screen px-5 xl:px-20 bg-[url(/assets/checked_bg.webp)] bg-cover bg-center bg-no-repeat">
      <Toaster />
      <div className="relative z-10 w-full flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* LEFT IMAGE */}
        <div className="h-[400px] sm:h-[450px] lg:h-[500px] flex-shrink-0 flex justify-center">
          <img
            src="/assets/output.webp"
            alt="Forgot password illustration"
            className="h-full w-auto object-contain"
          />
        </div>

        {/* RIGHT FORM */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-8 sm:p-10"
        >
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-3xl font-extrabold text-center mb-6"
          >
            <span className="text-[#4B8DE0]">Neet Peak</span>{" "}
            <span className="text-gray-900">
              {step === 1 ? "Forgot Password" : "Reset Password"}
            </span>
          </motion.h2>

          {/* Step 1: Email */}
          {step === 1 && (
            <form className="flex flex-col gap-4" onSubmit={handleEmailSubmit}>
              <motion.input
                variants={inputVariants}
                initial="hidden"
                animate="visible"
                type="email"
                name="email"
                placeholder="Enter your Email"
                value={formData.email}
                onChange={handleChange}
                className="rounded-2xl border border-gray-300 px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-[#4B8DE0]"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}

             <motion.button
  whileTap={{ scale: 0.95 }}
  type="submit"
  disabled={emailLoading}
  className={`mt-4 w-full rounded-2xl px-5 py-2 text-lg font-extrabold text-white ${
    emailLoading
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-gradient-to-t from-[#39538D] via-[#3B5A94] to-[#4FA2D5] hover:brightness-110"
  }`}
>
  {emailLoading ? "Sending..." : "Reset Password"}
</motion.button>

            </form>
          )}

          {/* Step 2: Reset Password */}
          {step === 2 && (
            <form
              className="flex flex-col gap-4"
              onSubmit={handlePasswordSubmit}
            >
              <div className="relative">
                <motion.input
                  variants={inputVariants}
                  initial="hidden"
                  animate="visible"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="New Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="rounded-2xl border border-gray-300 px-4 py-2 text-base w-full focus:outline-none focus:ring-2 focus:ring-[#4B8DE0]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}

              <motion.input
                variants={inputVariants}
                initial="hidden"
                animate="visible"
                type="password"
                name="confirmPassword"
                placeholder="Confirm New Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="rounded-2xl border border-gray-300 px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-[#4B8DE0]"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
              )}

             <motion.button
  whileTap={{ scale: 0.95 }}
  type="submit"
  disabled={passwordLoading}
  className={`mt-4 w-full rounded-2xl px-5 py-2 text-lg font-extrabold text-white ${
    passwordLoading
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-gradient-to-t from-[#39538D] via-[#3B5A94] to-[#4FA2D5] hover:brightness-110"
  }`}
>
  {passwordLoading ? "Updating..." : "Update Password"}
</motion.button>

            </form>
          )}
        </motion.div>
      </div>

      {/* OTP Modal */}
      <AnimatePresence>
        {showOtpModal && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl p-8 w-[90%] max-w-md text-center"
            >
              <h3 className="text-2xl font-extrabold text-gray-900 mb-2">
                Enter OTP
              </h3>
              <p className="text-gray-600 mb-4">
                We’ve sent a 4-digit OTP to your Email {formData.email}.
              </p>

              <p className="text-sm font-semibold text-[#4B8DE0] mb-4">
                Time Left: {formatTime(timeLeft)}
              </p>

              <div className="flex justify-center gap-3 mb-4">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={(el) => (otpRefs.current[idx] = el)}
                    type="text"
                    inputMode="numeric"
                    pattern="\d*"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange(e.target.value.trim(), idx)}
                    onKeyDown={(e) => handleOtpKeyDown(e, idx)}
                    className="w-12 h-12 text-center text-lg font-bold border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4B8DE0] outline-none"
                  />
                ))}
              </div>
              {otpError && (
                <p className="text-red-500 text-sm mb-2">{otpError}</p>
              )}

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleOtpSubmit}
                disabled={otpLoading}
                className={`w-full rounded-2xl px-5 py-2 text-lg font-extrabold text-white ${
                  timeLeft > 0
                    ? "bg-gradient-to-t from-[#39538D] via-[#3B5A94] to-[#4FA2D5] hover:brightness-110"
                    : "bg-gray-400 cursor-not-allowed"
                } focus:outline-none disabled:opacity-60`}
              >
                {otpLoading ? "Verifying..." : "Verify OTP"}
              </motion.button>

              <div className="flex items-center justify-between gap-4 mt-4 text-sm">
                <button
                  type="button"
                  onClick={() => setShowOtpModal(false)}
                  className="underline text-gray-600"
                >
                  Cancel
                </button>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
