
import { useState } from "react";
import { motion } from "framer-motion";

const inputVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function ForgotPassword() {
  const [step, setStep] = useState(1); // 1 = email, 2 = reset password
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

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

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (validateEmail()) {
      // API call: send reset link / OTP
      setStep(2);
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (validatePasswords()) {
      alert("✅ Password reset successful!");
      // API call: update password
    }
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
            alt="Forgot password illustration"
            className="h-full w-auto object-contain"
          />
        </div>

        {/* RIGHT FORM */}
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
            <span className="text-gray-900">
              {step === 1 ? "Forgot Password" : "Reset Password"}
            </span>
          </motion.h2>

          {/* Step 1: Email Form */}
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
                className="mt-4 w-full rounded-2xl px-5 py-2 text-lg font-extrabold text-white bg-gradient-to-t from-[#39538D] via-[#3B5A94] to-[#4FA2D5] hover:brightness-110 focus:outline-none"
              >
                Reset Password
              </motion.button>
            </form>
          )}

          {/* Step 2: New Password Form */}
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
                className="mt-4 w-full rounded-2xl px-5 py-2 text-lg font-extrabold text-white bg-gradient-to-t from-[#39538D] via-[#3B5A94] to-[#4FA2D5] hover:brightness-110 focus:outline-none"
              >
                Update Password
              </motion.button>
            </form>
          )}

          <p className="mt-6 text-center text-gray-700 text-sm">
            Remember your password?{" "}
            <a
              href="/signin"
              className="text-[#4B8DE0] font-bold hover:underline"
            >
              Sign In
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
 