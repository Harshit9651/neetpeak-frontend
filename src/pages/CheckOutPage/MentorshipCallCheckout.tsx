import { motion } from "framer-motion";
import { useState,useEffect } from "react";
import {useAuth} from "../../context/authContext"
import{useNavigate} from "react-router-dom" 
import {useMentorshipApi} from "../../Services/mentorship.api"
import { 
  CheckCircle, 
  Star, 
  Users, 
  BookOpen, 
  Brain, 
  Target,
  Sparkles,
  Clock,
  Shield
} from "lucide-react";

export default function DemoPayment() {
const { user, isAuthenticated, isLoading } = useAuth();
const navigate = useNavigate();
  const CALL_PRICE = 199;
  const [loading, setLoading] = useState(false);

useEffect(() => {
  if (!isLoading) {
    if (!isAuthenticated || !user?.id) {
      navigate("/signin");
    }
    console.log("User ID:", user?.id); 

  }
}, [isAuthenticated, user, isLoading, navigate]);
  useEffect(() => {
    if (!document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const [paid, setPaid] = useState(false);
  const [isHovering, setIsHovering] = useState(false);


const handleCallPayment = async () => {
  try {
    console.log("Initiating payment for user ID:", user?.id);
    setLoading(true);

    const totalAmountInPaise = Math.round(CALL_PRICE * 100);
    console.log("Total price in paise:", totalAmountInPaise);

    // Step 1: Create Razorpay Order
    const orderRes = await useMentorshipApi.createMentorshipCallBokkOrder({
      amount: CALL_PRICE,
      studentId: user.id,
    });
    console.log("Order Response:", orderRes);

    if (!orderRes.success) {
      alert(orderRes.message || "Failed to initiate order");
      return;
    }

    // Step 2: Razorpay Checkout Options
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: orderRes.amount, // backend se aa rha hai (paise me)
      currency: orderRes.currency,
      name: "Mentorship Quick Call",
      description: "Book a one-on-one mentorship call",
      image: "/logo.png",
      order_id: orderRes.orderId,

      handler: async function (response) {
        console.log("Payment Response:", response);

        // Step 3: Verify payment
        const verifyRes = await useMentorshipApi.verifyMentorshipCallBokkRazorpayPayment({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          studentId: user.id,
          price: CALL_PRICE,
        });

        if (verifyRes.success) {
          setPaid(true);
          navigate("/call-booking-confirmation");
        } else {
          alert("Payment failed: " + verifyRes.message);
        }
      },

      theme: { color: "#39538D" },
    };

    // Step 4: Open Razorpay UI
    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (err) {
    console.error("Error in call payment:", err);
    alert("Something went wrong during payment");
  } finally {
    setLoading(false);
  }
};



  const features = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "1-on-1 Mentor Guidance",
      description: "Personal guidance from NEET toppers to crack the exam"
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Curated Study Materials", 
      description: "Access to handpicked NEET prep books and resources"
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI-Powered Learning",
      description: "Personalized suggestions based on your learning pattern"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Elite Community",
      description: "Join a community of serious NEET aspirants"
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Interactive Study Plan",
      description: "Dynamic study plans with real-time progress tracking"
    }
  ];

  const testimonials = [
    { name: "Priya S.", score: "680/720", text: "The mentorship changed everything!" },
    { name: "Arjun K.", score: "695/720", text: "Best decision for NEET prep." },
    { name: "Sneha M.", score: "671/720", text: "Incredible guidance and support." }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-200/30 to-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-100/20 to-blue-100/20 rounded-full blur-3xl"></div>
      </div>

      <section className="relative z-10 flex flex-col xl:flex-row px-6 sm:px-10 lg:px-20 py-16 gap-16 min-h-screen">
        {/* LEFT - Features & Content */}
        <motion.div
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="xl:w-2/3 flex flex-col justify-center space-y-12"
        >
          {/* Hero Section */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="flex items-center bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                <Star className="w-4 h-4 mr-2 fill-current" />
                Limited Time Offer
              </div>
              <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                <Clock className="w-4 h-4 inline mr-1" />
                24h Only
              </div>
            </motion.div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 leading-tight">
              Unlock Your
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                NEET Success
              </span>
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
              Join thousands of successful NEET aspirants who transformed their preparation 
              with our personalized mentorship program.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid gap-6 lg:gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                className="group"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ x: 10 }}
              >
                <div className="flex items-start gap-6 p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:bg-white/80">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Success Stories */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-gray-900 text-center lg:text-left">
              Success Stories That Inspire
            </h3>
            <div className="grid sm:grid-cols-3 gap-4">
              {testimonials.map((testimonial, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200/50"
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      {testimonial.score}
                    </div>
                    <div className="font-semibold text-gray-800 mb-2">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      "{testimonial.text}"
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT - Enhanced Payment Section */}
    <motion.div
  initial={{ x: 60, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  transition={{ duration: 0.8 }}
  className="xl:w-1/3 flex flex-col justify-start items-center relative mt-[-60px] xl:mt-0"
>

          {/* Floating Payment Card */}
          <motion.div
            className="relative"
            animate={{ 
              y: isHovering ? -10 : 0,
              rotateY: isHovering ? 5 : 0 
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onHoverStart={() => setIsHovering(true)}
            onHoverEnd={() => setIsHovering(false)}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-2xl opacity-20 scale-105"></div>
            
            <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 sm:p-10 w-full max-w-sm border border-white/20">
              {/* Header */}
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                >
                  <Sparkles className="w-8 h-8 text-white" />
                </motion.div>
                
                <h3 className="text-3xl font-black text-gray-900 mb-2">
                  Book Your Demo
                </h3>
                <p className="text-gray-600">
                  Secure your spot for a personalized NEET strategy session
                </p>
              </div>

              {/* Pricing */}
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <span className="text-lg text-gray-500 line-through">₹299</span>
                  <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                   {`₹${CALL_PRICE}`}
                  </span>
                </div>
                
                <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl p-3 mb-6">
                  <div className="text-red-600 font-semibold text-sm">
                    🔥 67% OFF - Limited Time Only!
                  </div>
                </div>

                {/* What's Included */}
                <div className="bg-blue-50/50 rounded-xl p-4 mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3 text-sm">What You Get:</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>30-min personalized demo</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Custom study roadmap</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Free practice materials</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Button */}
              <motion.button
              onClick={handleCallPayment}
              className="relative w-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform transition-all duration-300 overflow-hidden group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading || paid}
            >
              <div className="relative flex items-center justify-center gap-2">
                {loading ? "Processing..." : paid ? "Payment Successful!" : "Secure Payment"}
              </div>
            </motion.button>

              {/* Success Message */}
              {paid && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, type: "spring" }}
                  className="mt-6 text-center"
                >
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4">
                    <div className="text-green-600 font-bold text-lg flex items-center justify-center gap-2 mb-2">
                      <CheckCircle className="w-6 h-6" />
                      Demo Booked Successfully!
                    </div>
                    <p className="text-green-700 text-sm">
                      Check your email for demo call details
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Security Badge */}
              <div className="text-center mt-6">
                <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                  <Shield className="w-4 h-4" />
                  <span>Secured by 256-bit SSL encryption</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Floating Elements */}
          <motion.div
            className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white shadow-lg"
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              rotate: { duration: 8, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity }
            }}
          >
            <Star className="w-6 h-6 fill-current" />
          </motion.div>

          <motion.div
            className="absolute -bottom-4 -left-6 w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white shadow-lg"
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Sparkles className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}