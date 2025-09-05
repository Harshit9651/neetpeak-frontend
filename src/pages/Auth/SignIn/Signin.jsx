// src/pages/SignIn.jsx
import { motion } from "framer-motion";

const inputVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function SignIn() {
  return (
    <section
      className="relative w-full flex justify-center items-center min-h-screen px-5 xl:px-20
                 bg-[url(/assets/checked_bg.webp)] bg-cover bg-center bg-no-repeat"
    >
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

          <form className="flex flex-col gap-6">
            <motion.input
              variants={inputVariants}
              initial="hidden"
              animate="visible"
              type="email"
              placeholder="Email Address"
              className="rounded-2xl border border-gray-300 px-5 py-3 text-lg focus:outline-none 
                         focus:ring-2 focus:ring-[#4B8DE0]"
            />

            <motion.input
              variants={inputVariants}
              initial="hidden"
              animate="visible"
              type="password"
              placeholder="Password"
              className="rounded-2xl border border-gray-300 px-5 py-3 text-lg focus:outline-none 
                         focus:ring-2 focus:ring-[#4B8DE0]"
            />

            <motion.button
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="mt-6 w-full rounded-2xl px-6 py-3 text-xl font-extrabold text-white 
                         bg-gradient-to-t from-[#39538D] via-[#3B5A94] to-[#4FA2D5] 
                         hover:brightness-110 focus:outline-none"
            >
              Sign In
            </motion.button>
          </form>

          <p className="mt-8 text-center text-gray-700 text-base">
            Forgot your password?{" "}
            <button
              type="button"
              className="text-[#4B8DE0] font-bold hover:underline"
            >
              Reset here
            </button>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
