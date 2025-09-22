import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { useStudentApi } from "../../../Services/studentAPi"; 
import {useNavigate} from "react-router-dom"

const inputVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function SignUp() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const [timeLeft, setTimeLeft] = useState(300); 
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpToken, setOtpToken] = useState(null); 
  const otpRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const Navigate = useNavigate()


  useEffect(() => {
    let timer;
    if (showOtpModal && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [showOtpModal, timeLeft]);

  useEffect(() => {
    if (showOtpModal) {
      setTimeout(() => otpRefs[0].current?.focus(), 50);
    }
  }, [showOtpModal]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const validate = () => {
    let tempErrors = {};
    if (!formData.fullName.trim())
      tempErrors.fullName = "Full Name is required";
    if (!formData.email) tempErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      tempErrors.email = "Email is invalid";
    if (!formData.phone) tempErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(formData.phone))
      tempErrors.phone = "Phone must be 10 digits";
    if (!formData.password) tempErrors.password = "Password is required";
    if (!formData.confirmPassword)
      tempErrors.confirmPassword = "Confirm password is required";
    else if (formData.password !== formData.confirmPassword)
      tempErrors.confirmPassword = "Passwords do not match";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fix validation errors.");
      return;
    }

    setLoading(true);
    try {
      
      const payload = {
        name: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        password: formData.password,
      };
console.log("Signup payload:", payload);
      const res = await useStudentApi.registerStudent(payload);
      console.log("Signup raw response:", res);
      const data = res;
      console.log("Signup response:", data);

      if (data && (data.success === true || res.ok)) {
        if (data.tempToken) setOtpToken(data.tempToken);
        setOtp(["", "", "", ""]);
        setOtpError("");
        setTimeLeft(300);
        setShowOtpModal(true);
        toast.success("OTP sent to your phone. Please verify.");
      } else {
        const message =
          (data && (data.message || data.error)) ||
          "Unable to register. Please try again.";
        toast.error(message);
      }
    } catch (err) {
      console.error("Signup error:", err);
      toast.error(
        err?.message || "Network error. Please check your connection."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      otpRefs[index + 1].current?.focus();
    }
  };

  const handleOtpKeyDown = (e, idx) => {
    if (e.key === "Backspace") {
      if (otp[idx]) {
        // clear same input
        const newOtp = [...otp];
        newOtp[idx] = "";
        setOtp(newOtp);
      } else if (idx > 0) {
        otpRefs[idx - 1].current?.focus();
        const newOtp = [...otp];
        newOtp[idx - 1] = "";
        setOtp(newOtp);
      }
    } else if (e.key === "ArrowLeft" && idx > 0) {
      otpRefs[idx - 1].current?.focus();
    } else if (e.key === "ArrowRight" && idx < 3) {
      otpRefs[idx + 1].current?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").trim();
    if (/^\d{4}$/.test(paste)) {
      setOtp(paste.split(""));
      setTimeout(() => otpRefs[3].current?.focus(), 10);
    }
  };

  const handleOtpSubmit = async () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 4) {
      setOtpError("Please enter the 4-digit OTP.");
      return;
    }
    if (timeLeft <= 0) {
      setOtpError("OTP expired. Please resend.");
      return;
    }

    setOtpLoading(true);
    try {
      const payload = {
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        otp: enteredOtp,
        tempToken: otpToken,
      };

      const res = await useStudentApi.verifyStudentOtp(payload);
      const data = res;
      console.log("OTP verify response:", data);

      if (data && (data.success === true || res.ok)) {
        toast.success("Signup successful! 🎉");
        setShowOtpModal(false);

        setFormData({
          fullName: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
        });
        Navigate("/signin")

      } else {
        const message =
          (data && (data.message || data.error)) ||
          "OTP verification failed. Try again.";
        setOtpError(message);
        toast.error(message);
      }
    } catch (err) {
      console.error("OTP verify error:", err);
      setOtpError(err?.message || "Network error. Please try again.");
      toast.error(err?.message || "Network error. Please try again.");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    console.log("we are in resend otp function");
    try {
      const payload = {
        name: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        password: formData.password,
        resend: true,
      };

      const res = await useStudentApi.resendOtp(payload);
      const data = res;
      console.log("Resend OTP response:", data);

      if (data && (data.success === true || res.ok)) {
        if (data.tempToken) setOtpToken(data.tempToken);
        setTimeLeft(300);
        setOtp(["", "", "", ""]);
        setOtpError("");
        toast.success("OTP resent. Check your Email.");
      } else {
        const message =
          (data && (data.message || data.error)) ||
          "Unable to resend OTP. Try again later.";
        toast.error(message);
      }
    } catch (err) {
      console.error("Resend OTP error:", err);
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <>
      <Toaster position="top-right" />
      <section
        className="relative w-full flex justify-center items-center min-h-screen px-5 xl:px-20
                 bg-[url(/assets/checked_bg.webp)] bg-cover bg-center bg-no-repeat"
      >
        <div className="relative z-10 w-full flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* LEFT IMAGE */}
          <div className="h-[400px] sm:h-[450px] lg:h-[500px] flex-shrink-0 flex justify-center">
            <img
              src="/assets/output.webp"
              alt="Student illustration"
              className="h-full w-auto object-contain"
            />
          </div>

          {/* RIGHT SIGNUP FORM */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-md shadow-2xl 
                     rounded-3xl p-8 sm:p-10"
          >
            <motion.h2
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-2xl sm:text-3xl font-extrabold text-center mb-6"
            >
              <span className="text-[#4B8DE0]">Neet Peak</span>{" "}
              <span className="text-gray-900">Sign Up</span>
            </motion.h2>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <motion.input
                variants={inputVariants}
                initial="hidden"
                animate="visible"
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                aria-label="Full name"
                className="rounded-2xl border border-gray-300 px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-[#4B8DE0]"
                disabled={loading}
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm">{errors.fullName}</p>
              )}

              <motion.input
                variants={inputVariants}
                initial="hidden"
                animate="visible"
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                aria-label="Email address"
                className="rounded-2xl border border-gray-300 px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-[#4B8DE0]"
                disabled={loading}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}

              <motion.input
                variants={inputVariants}
                initial="hidden"
                animate="visible"
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                aria-label="Phone number"
                className="rounded-2xl border border-gray-300 px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-[#4B8DE0]"
                disabled={loading}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone}</p>
              )}

              <div className="relative">
                <motion.input
                  variants={inputVariants}
                  initial="hidden"
                  animate="visible"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  aria-label="Password"
                  className="rounded-2xl border border-gray-300 px-4 py-2 text-base w-full focus:outline-none focus:ring-2 focus:ring-[#4B8DE0]"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold"
                  aria-pressed={showPassword}
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
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                aria-label="Confirm password"
                className="rounded-2xl border border-gray-300 px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-[#4B8DE0]"
                disabled={loading}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
              )}

              <motion.button
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={loading}
                className="mt-4 w-full rounded-2xl px-5 py-2 text-lg font-extrabold text-white bg-gradient-to-t from-[#39538D] via-[#3B5A94] to-[#4FA2D5] hover:brightness-110 focus:outline-none disabled:opacity-60"
                aria-busy={loading}
              >
                {loading ? "Creating account..." : "Sign Up"}
              </motion.button>
            </form>

            <p className="mt-6 text-center text-gray-700 text-sm">
              Already have an account?{" "}
              <a
                href="/signin"
                className="text-[#4B8DE0] font-bold hover:underline"
              >
                Sign In
              </a>
            </p>
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

                {/* Countdown */}
                <p className="text-sm font-semibold text-[#4B8DE0] mb-4">
                  Time Left: {formatTime(timeLeft)}
                </p>

                <div
                  className="flex justify-center gap-3 mb-4"
                  onPaste={handleOtpPaste}
                >
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      id={`otp-${idx}`}
                      ref={otpRefs[idx]}
                      type="text"
                      inputMode="numeric"
                      pattern="\d*"
                      maxLength="1"
                      value={digit}
                      onChange={(e) =>
                        handleOtpChange(e.target.value.trim(), idx)
                      }
                      onKeyDown={(e) => handleOtpKeyDown(e, idx)}
                      className="w-12 h-12 text-center text-lg font-bold border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4B8DE0] outline-none"
                      aria-label={`OTP digit ${idx + 1}`}
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
                    onClick={() => {
                      setShowOtpModal(false);
                    }}
                    className="underline text-gray-600"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    disabled={loading}
                    onClick={handleResendOtp}
                    className={`font-semibold transition-colors duration-200 ${
                      loading
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-[#4B8DE0] hover:text-[#356ac3] hover:underline"
                    }`}
                  >
                    {loading ? "Resending..." : "Resend OTP"}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
}
