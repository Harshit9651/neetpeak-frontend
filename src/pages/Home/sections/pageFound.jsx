// src/pages/ApiApprovalIssue.jsx
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ShieldAlert } from "lucide-react";

export default function ApiApprovalIssue() {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen w-full flex justify-center items-center bg-gradient-to-br from-blue-50 via-slate-100 to-blue-100 px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white shadow-2xl rounded-3xl p-10 max-w-lg text-center border border-blue-100"
      >
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-red-100 rounded-full">
            <ShieldAlert className="text-red-500 w-12 h-12" />
          </div>
        </div>

        <motion.h2
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3"
        >
          API Access Pending Approval
        </motion.h2>

        <p className="text-gray-600 text-base leading-relaxed mb-6">
          Your API access is currently on hold.  
          To activate the API services
        </p>

        

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/contact")}
          className="bg-gradient-to-r from-[#3B5A94] to-[#4FA2D5] text-white font-semibold px-8 py-3 rounded-2xl hover:brightness-110 shadow-md"
        >
          Contact Support
        </motion.button>

        <p className="text-sm text-gray-500 mt-6">
          — Thank you for your understanding and cooperation —
        </p>
      </motion.div>
    </section>
  );
}
