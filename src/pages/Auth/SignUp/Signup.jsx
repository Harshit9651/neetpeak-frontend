// src/pages/SignUp.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState(300); // 300s = 5 min

  // Timer effect
  useEffect(() => {
    let timer;
    if (showOtpModal && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [showOtpModal, timeLeft]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const validate = () => {
    let tempErrors = {};
    if (!formData.fullName.trim()) tempErrors.fullName = "Full Name is required";
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setShowOtpModal(true);
      setOtp(["", "", "", ""]);
      setOtpError("");
      setTimeLeft(300); // reset timer to 5 min
    }
  };

  const handleOtpChange = (value, index) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 3) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleOtpSubmit = () => {
    if (timeLeft <= 0) {
      setOtpError("OTP expired. Please request a new one.");
      return;
    }

    const enteredOtp = otp.join("");
    if (enteredOtp === "1234") {
      setOtpError("");
      setShowOtpModal(false);
      alert("🎉 Signup successful with OTP verified!");
    } else {
      setOtpError("Invalid OTP, please try again.");
    }
  };

  // Format mm:ss
  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
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
              className="rounded-2xl border border-gray-300 px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-[#4B8DE0]"
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
              className="rounded-2xl border border-gray-300 px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-[#4B8DE0]"
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
              className="rounded-2xl border border-gray-300 px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-[#4B8DE0]"
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
              placeholder="Confirm Password"
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
              className="mt-4 w-full rounded-2xl px-5 py-2 text-lg font-extrabold text-white bg-gradient-to-t from-[#39538D] via-[#3B5A94] to-[#4FA2D5] hover:brightness-110 focus:outline-none"
            >
              Sign Up
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
                We’ve sent a 4-digit OTP to your number.
              </p>

              {/* Countdown */}
              <p className="text-sm font-semibold text-[#4B8DE0] mb-6">
                Time Left: {formatTime(timeLeft)}
              </p>

              <div className="flex justify-center gap-3 mb-4">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-${idx}`}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange(e.target.value, idx)}
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
                disabled={timeLeft <= 0}
                className={`w-full rounded-2xl px-5 py-2 text-lg font-extrabold text-white ${
                  timeLeft > 0
                    ? "bg-gradient-to-t from-[#39538D] via-[#3B5A94] to-[#4FA2D5] hover:brightness-110"
                    : "bg-gray-400 cursor-not-allowed"
                } focus:outline-none`}
              >
                Verify OTP
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
