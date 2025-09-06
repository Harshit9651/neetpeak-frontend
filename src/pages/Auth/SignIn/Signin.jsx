// src/pages/SignIn.jsx
import { motion } from "framer-motion";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useStudentApi } from "../../../Services/studentAPi"; 
import { useNavigate } from "react-router-dom";
const inputVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function SignIn() {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const Navigate = useNavigate();

  // validation
  const validateForm = () => {
    let newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fix the errors before signing in.");
      return;
    }

    try {
      setLoading(true);
      const res = await useStudentApi.loginStudent(formData);
      console.log("Login response:", res);

      if (res.success) {
        setFormData({ email: "", password: "" });
        setErrors({});
        toast.success("Signed in successfully!");
        Navigate("/");
      
      } else {
        toast.error(res.message || "Invalid email or password.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="relative w-full flex justify-center items-center min-h-screen px-5 xl:px-20
                 bg-[url(/assets/checked_bg.webp)] bg-cover bg-center bg-no-repeat"
    >
      <Toaster
        position="top-center"
        toastOptions={{
          style: { fontSize: "14px", fontWeight: "600" },
        }}
      />

      <div className="relative z-10 w-full flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* LEFT SIDE IMAGE */}
        <div className="h-[420px] sm:h-[480px] lg:h-[560px] flex-shrink-0 flex justify-center">
          <img
            src="/assets/output.webp"
            alt="Student illustration"
            className="h-full w-auto object-contain"
          />
        </div>

        {/* RIGHT SIDE SIGN IN FORM */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 w-full max-w-lg bg-white/90 backdrop-blur-md shadow-2xl 
                     rounded-3xl p-10 sm:p-14"
        >
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-extrabold text-center mb-8"
          >
            <span className="text-[#4B8DE0]">Neet Peak</span>{" "}
            <span className="text-gray-900">Sign In</span>
          </motion.h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Email */}
            <motion.div
              variants={inputVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-1"
            >
              <input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className={`rounded-2xl border px-5 py-3 text-lg focus:outline-none 
                focus:ring-2 focus:ring-[#4B8DE0] ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </motion.div>

            {/* Password */}
        <motion.div
  variants={inputVariants}
  initial="hidden"
  animate="visible"
  className="flex flex-col gap-1 relative"
>
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Password"
    value={formData.password}
    onChange={(e) =>
      setFormData({ ...formData, password: e.target.value })
    }
    className={`w-full rounded-2xl border px-5 py-3 pr-16 text-lg focus:outline-none 
    focus:ring-2 focus:ring-[#4B8DE0] ${
      errors.password ? "border-red-500" : "border-gray-300"
    }`}
  />
  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-semibold hover:text-[#4B8DE0] transition"
    aria-pressed={showPassword}
  >
    {showPassword ? "Hide" : "Show"}
  </button>

  {errors.password && (
    <p className="text-red-500 text-sm">{errors.password}</p>
  )}
</motion.div>


          
            <motion.button
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading}
              className="mt-6 w-full rounded-2xl px-6 py-3 text-xl font-extrabold text-white 
                         bg-gradient-to-t from-[#39538D] via-[#3B5A94] to-[#4FA2D5] 
                         hover:brightness-110 focus:outline-none disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign In"}
            </motion.button>
          </form>

          <p className="mt-8 text-center text-gray-700 text-base">
            Forgot your password?{" "}
            <button
              type="button"
              className="text-[#4B8DE0] font-bold hover:underline"
              onClick={()=>{ Navigate("/reset-password")}}
            >
              Reset here
            </button>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
