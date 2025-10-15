import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CheckCircle2, Clock } from "lucide-react";
import { useAuth } from "../../context/authContext";
import { useProductApi } from "../../Services/product.api";


export default function MentorshipCheckout() {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const plan = location.state?.plan;

  const [finalPrice, setFinalPrice] = useState(plan?.price || 0); 
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !user?.id) {
      navigate("/signin");
    }
  }, [isAuthenticated, user, navigate]);


  if (!plan) {
    navigate("/");
    return null;
  }

  useEffect(() => {
    if (!document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);


  const handlePayment = async () => {
    try {
      setLoading(true);
      const totalAmountInPaise = Math.round(finalPrice * 100);
      const orderRes = await useProductApi.createOrder({
        amount: finalPrice,
        planId: plan._id,
   studentId: user.id,
      });

      if (!orderRes.success) {
        alert(orderRes.message || "Failed to initiate order");
        setLoading(false);
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, 
        amount: orderRes.amount,
        currency: orderRes.currency,
        name: "Mentorship Plan",
        description: plan.planName,
        image: "/logo.png", 
        order_id: orderRes.orderId,
        handler: async function (response) {
          const verifyRes = await useProductApi.verifyRazorpayPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            planId: plan._id,
          studentId: user.id,
          });

          if (verifyRes.success) {
            alert("Payment Successful! Plan Enrolled.");
            navigate("/");
          } else {
            alert("Payment failed: " + verifyRes.message);
          }
        },
        theme: {
          color: "#39538D",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      setLoading(false);
    } catch (err) {
      console.error("Error in payment:", err);
      alert("Something went wrong during payment");
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10 px-6 flex justify-center">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left side - Plan Details */}
        <div className="md:col-span-2 bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden">
          <div className="mb-6">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
              {plan.planName}
            </h2>
            <p className="text-gray-600 text-base leading-relaxed">
              {plan.description}
            </p>
          </div>

          {/* Highlights */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
              <Clock className="w-6 h-6 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Duration</p>
                <p className="font-semibold text-gray-900">
                  {plan.duration} Months
                </p>
              </div>
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              What’s Included
            </h3>
            <ul className="space-y-3">
              {plan.features?.map((f, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-1" />
                  <span className="text-gray-700 text-sm md:text-base">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right side - Order Summary */}
        <div className="bg-white rounded-2xl shadow-xl p-8 h-fit sticky top-10">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>
          <div className="flex justify-between mb-3">
            <span className="text-gray-600">Plan Price</span>
            <span className="font-medium">₹{plan.mrp}</span>
          </div>
          <div className="flex justify-between mb-3">
            <span className="text-gray-600">Discount</span>
            <span className="text-green-600 font-medium">-₹{plan.mrp - plan.price}</span>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between font-bold text-xl text-gray-900">
            <span>Total</span>
            <span>₹{finalPrice}</span>
          </div>

          <button
            onClick={handlePayment}
            disabled={loading}
            className="mt-6 w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold py-3 rounded-xl transition disabled:opacity-60"
          >
            {loading ? "Processing..." : "Proceed to Pay"}
          </button>
        </div>
      </div>
    </div>
  );
}
