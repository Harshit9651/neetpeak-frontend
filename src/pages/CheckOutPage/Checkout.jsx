 import React, { useEffect, useState } from "react";
import { useParams, useSearchParams ,useNavigate} from "react-router-dom";
import { useCourseApi } from "../Services/courseApi";
import { Clock, Tag, BadgeCheck, BookOpen } from "lucide-react";
const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY;


const CheckoutPage = () => {
  const { courseId } = useParams();
  const [searchParams] = useSearchParams();
  const studentId = searchParams.get("studentId");
const  navigate = useNavigate()
  const [course, setCourse] = useState(null);
  const [promoCode, setPromoCode] = useState("");
  const [finalPrice, setFinalPrice] = useState(null);
  const [promoApplied, setPromoApplied] = useState(false);
  const [loadingPromo, setLoadingPromo] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await useCourseApi.getCourseById(courseId);
        setCourse(res.data);
        setFinalPrice(res.data.price);
      } catch (err) {
        console.error("Failed to fetch course:", err);
      }
    })();
  }, [courseId]);
  useEffect(() => {
  if (!document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }
}, []);


const handleApplyPromo = async () => {
  setLoadingPromo(true);
  try {
    const res = await useCourseApi.validatePromo({
      code: promoCode,
      courseId: course._id,
      studentId: studentId,
    });

    if (res.success) {
      const discount = (course.price * res.discountPercent) / 100;
      setFinalPrice(Number((course.price - discount).toFixed(2)));
      setPromoApplied(true);
      setError("");
    } else {
      setError(res.message || "Invalid promo code");
      setPromoApplied(false);
    }
  } catch (err) {
    console.error("Error applying promo:", err);
    setError("Failed to validate promo code");
    setPromoApplied(false);
  } finally {
    setLoadingPromo(false);
  }
};

const handlePayment = async () => {
  try {
    const totalAmountInPaise = Math.round(finalPrice * 100);

    if (totalAmountInPaise < 100) {
      const res = await useCourseApi.verifyRazorpayPayment({
        razorpay_order_id: "FREE-ORDER",
        razorpay_payment_id: "FREE-ACCESS",
        razorpay_signature: "NA",
        courseId: course._id,
        studentId,
        promoCode,
      });

      if (res.success) {
             navigate("/account/courses");
      } else {
        alert("Something went wrong: " + res.message);
      }
      return;
    }

    const orderRes = await useCourseApi.createOrder({
      amount: totalAmountInPaise,
      courseId: course._id,
      studentId,
      promoCode,
    });

    if (!orderRes.success) {
      setError(orderRes.message || "Failed to initiate order");
      return;
    }

    const options = {
      key: razorpayKey,
      amount: orderRes.amount,
      currency: orderRes.currency,
      name: course.title,
      description: "Course Purchase",
      image: course.image,
      order_id: orderRes.orderId,
      handler: async function (response) {
        const verifyRes = await useCourseApi.verifyRazorpayPayment({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          courseId: course._id,
          studentId,
          promoCode,
        });

        if (verifyRes.success) {
          
           navigate("/account/courses");
        } else {
          alert("Payment failed: " + verifyRes.message);
        }
      },
 
      theme: {
        color: "#6366F1",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (err) {
    console.error("Error in payment:", err);
    alert("Something went wrong during payment");
  }
};


  if (!course) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-500 text-sm animate-pulse">Fetching course details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
      
      {/* Left: Course Details */}
      <div className="lg:col-span-2 space-y-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-black">{course.title}</h1>
        
        {/* Course Image */}
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-64 object-cover rounded-xl shadow-md"
        />

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-purple-500" />
            <strong>Duration:</strong> {course.duration}
          </span>
          <span className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-blue-500" />
            <strong>Level:</strong> {course.courseLevel}
          </span>
        </div>

        {/* Description */}
        <div className="text-gray-800 text-base whitespace-pre-line mt-4 leading-relaxed">
          {course.content}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-5">
          {course.tags?.map((tag, idx) => (
            <span key={idx} className="bg-gray-200 text-gray-800 text-xs px-3 py-1 rounded-full inline-flex items-center gap-1">
              <Tag className="w-3 h-3" />
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Right: Order Summary */}
      <div className="bg-white border shadow-xl rounded-2xl p-6 sticky top-20 h-fit">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">Order Summary</h2>

        <div className="text-gray-700 text-sm mb-2 flex justify-between">
          <span>Original Price:</span>
          <span className="line-through">₹{course.mrp}</span>
        </div>

        <div className="flex justify-between text-lg font-bold text-green-600 mb-4">
          <span>Final Price:</span>
          <span>₹{finalPrice?.toFixed(2)}</span>
        </div>

        {/* Promo Code */}
        <div className="mb-5">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Have a Promo Code?
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Enter code"
              className="flex-1 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
        <button
  onClick={handleApplyPromo}
  disabled={loadingPromo}
  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-md transition flex items-center justify-center min-w-[80px]"
>
  {loadingPromo ? (
    <svg
      className="animate-spin h-4 w-4 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      ></path>
    </svg>
  ) : (
    "Apply"
  )}
</button>

          </div>
          {promoApplied && (
            <p className="text-green-600 text-sm mt-2 flex items-center gap-1">
              <BadgeCheck className="w-4 h-4" />
              Promo applied successfully!
            </p>
          )}
          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        </div>

        {/* Pay Button */}
       <button
  onClick={handlePayment}
  className="w-full py-3 bg-black text-white font-semibold rounded-full hover:bg-gray-900 transition cursor-pointer"
>
  Pay ₹{finalPrice.toFixed(2)}
</button>

      </div>
    </div>
  );
};

export default CheckoutPage;
