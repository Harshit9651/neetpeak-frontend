import { CheckCircle, PhoneCall, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function CallBookingConfirmation() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-white rounded-3xl shadow-2xl border border-slate-200/60 max-w-md w-full text-center p-8 md:p-10"
      >
        <div className="flex justify-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 120 }}
            className="bg-green-100 p-4 rounded-full"
          >
            <CheckCircle className="w-12 h-12 text-green-600" />
          </motion.div>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">
          Call Booked Successfully 🎉
        </h1>

        <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6">
          Thank you for booking your demo call!  
          Our <span className="font-semibold text-indigo-600">mentor</span> will contact you soon for confirmation.
        </p>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left space-y-3">
          <div className="flex items-center gap-3">
            <PhoneCall className="text-blue-600 w-5 h-5" />
            <span className="text-slate-700 text-sm">
              Expect a call from our mentor within 24 hours.
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="text-purple-600 w-5 h-5" />
            <span className="text-slate-700 text-sm">
              Stay near your registered phone for confirmation.
            </span>
          </div>
        </div>

        <motion.button
          onClick={() => navigate("/")}
          whileHover={{ scale: 1.05 }}
          className="mt-8 w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all"
        >
          Back to Home
        </motion.button>

        <p className="mt-4 text-xs text-slate-500">
          We’ll notify you shortly 💬
        </p>
      </motion.div>
    </div>
  );
}
