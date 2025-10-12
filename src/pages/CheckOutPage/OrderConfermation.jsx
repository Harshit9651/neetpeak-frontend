import { CheckCircle, Mail, Phone, Package, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

export default function OrderConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const orderData = location.state;

  if (!orderData) {
    navigate("/"); // fallback safety
    return null;
  }

  const { productType, product, amount, quantity } = orderData;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-indigo-50/30 to-blue-50/60 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-3xl shadow-2xl border border-slate-200/60 max-w-md w-full text-center p-8 md:p-10"
      >
        {/* ✅ Success Icon */}
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
          Order Confirmed 🎉
        </h1>

        <p className="text-slate-600 text-sm md:text-base leading-relaxed">
          Thank you for purchasing{" "}
          <span className="font-semibold text-blue-600">{product?.title}</span>!{" "}
          Your {productType.toLowerCase()} order has been successfully placed.
        </p>

        {/* ✅ Dynamic Info */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl mt-6 p-4 text-left space-y-3">
          {productType === "Book" ? (
            <>
              <div className="flex items-center gap-3">
                <Package className="text-blue-600 w-5 h-5" />
                <span className="text-slate-700 text-sm">
                  Your physical copy is being prepared for shipment.
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-teal-600 w-5 h-5" />
                <span className="text-slate-700 text-sm">
                  Our representative will contact you for delivery confirmation.
                </span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-3">
                <FileText className="text-indigo-600 w-5 h-5" />
                <span className="text-slate-700 text-sm">
                  Your digital notes are ready for download.
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="text-blue-600 w-5 h-5" />
                <span className="text-slate-700 text-sm">
                  A download link has been sent to your registered email.
                </span>
              </div>
            </>
          )}
        </div>

        <motion.button
          onClick={() => navigate("/")}
          whileHover={{ scale: 1.05 }}
          className="mt-8 w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all"
        >
          Continue Shopping
        </motion.button>

        <p className="mt-4 text-xs text-slate-500">
          Amount Paid: ₹{amount} | Qty: {quantity}
        </p>

        <p className="mt-2 text-xs text-slate-500">
          Thank you for shopping with <span className="font-semibold text-indigo-600">Neetpeak</span> 💙
        </p>
      </motion.div>
    </div>
  );
}
