import { useState, useEffect, use } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Shield, Truck, ArrowRight, CreditCard, Percent, AlertCircle } from "lucide-react";
import AddressForm from "./AddressForm";
import { useAuth } from "../../context/authContext";
import {useProductApi} from "../../Services/product.api"
const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY;
export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart = [], totals = {} } = location.state || {};
   const { user, isAuthenticated } = useAuth();

  const [promoCode, setPromoCode] = useState("");
  const [promoError, setPromoError] = useState(null);
  const [discountApplied, setDiscountApplied] = useState(0);
  const [discountPrice,setDiscountPrice] = useState(0)
  const [loading, setLoading] = useState(false);
const itemDetails = cart.length > 0 ? cart[0] : null; 
console.log("selected product cart item detail is :", itemDetails)
 const [shippingAddress, setShippingAddress] = useState(null);
 const [isAddressValid, setIsAddressValid] = useState(false);
 const [showAddressForm, setShowAddressForm] = useState(false);
 const selectedItem = cart.length > 0 ? cart[0] : null;
  const productId = selectedItem?.productId;
  const productType = selectedItem?.productType;
const finalTotal = discountApplied > 0 
  ? discountApplied  
  : totals.subtotal || 0;  

  console.log("hii the final total for :", finalTotal)

  useEffect(() => {
  if (!document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }
}, []);

const handleApplyPromo = async () => {
  if (!promoCode.trim()) return;
  setLoading(true);
  setPromoError(null);

  try {
    const selectedItem = cart.length > 0 ? cart[0] : null; 
    const productId = selectedItem?.productId;
    const quantity = selectedItem?.quantity || 1;
    const userId = user ? user.id : null;

    console.log("selected item is :", selectedItem);
    console.log("selected product quantity is :", quantity);

    const res = await useProductApi.validatePromo({
      code: promoCode,
      productId: productId,
      studentId: userId,
      quantity: quantity,   
    });

    if (res.success) {
      console.log("hii the respone from backend side is :",res)
      setDiscountApplied(res.finalPrice);
      setDiscountPrice(res.discountAmount)
      setPromoError(null);
    } else {
      setDiscountApplied(0);
      setPromoError(res.message || "Invalid promo code");
    }
  } catch (err) {
    setPromoError("Something went wrong. Try again.");
  }
  setLoading(false);
};



 const handlePayment = async () => {
    try {
      console.log("hii we are in Handle paymnet function ")
      const userId = user?.id;
      const totalAmountInPaise = Math.round(finalTotal * 100);
      const orderRes = await useProductApi.createProductOrder({
        userId,
        productId,
        promoCode: promoCode || null,
        shippingAddress: productType === "Book" ? shippingAddress : null,
        finalpriceInpaise :totalAmountInPaise
      });


      if (!orderRes.success) {
        alert(orderRes.message || "Failed to create order");
        return;
      }

      if (orderRes.free) {
        alert("Free order applied successfully!");
        navigate("/");
        return;
      }
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderRes.amount,
        currency: orderRes.currency,
        name: selectedItem?.title || "Course Purchase",
        description: "Purchase",
        image: selectedItem?.images?.[0] || "/placeholder.png",
        order_id: orderRes.orderId,
        handler: async function (response) {
          const verifyRes = await useProductApi.verifyRazorpayProductPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            productId,
            userId,
          });

          if (verifyRes.success) {
            alert("Payment successful!");
            navigate("/account/courses");
          } else {
            alert("Payment failed: " + verifyRes.message);
          }
        },
        theme: { color: "#6366F1" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment error:", err);
      alert("Something went wrong during payment.");
    }
  };

const handlePayClick = () => {
  if (itemDetails?.productType === "Book" && !showAddressForm) {
    setShowAddressForm(true);
    return;
  }

  if (itemDetails?.productType === "Book" && !isAddressValid) {
    alert("Please fill the shipping address to proceed.");
    return;
  }

  handlePayment(); 
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-slate-200/60 sticky top-0 z-10">
        <div className="container mx-auto px-6 py-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            Checkout
          </h1>
          <p className="text-slate-500 text-sm">{cart.length} items in your order</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 grid grid-cols-1 xl:grid-cols-3 gap-6 xl:gap-8">
        {/* LEFT: Order Items */}
        <div className="xl:col-span-2 space-y-4">
          {cart.map((item, i) => (
            <div
              key={i}
              className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-slate-200/60 p-6 flex gap-6"
            >
              <div className="w-24 h-24 flex-shrink-0 bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl p-2">
                <img
                  src={item?.images?.[0] || "/placeholder.png"}
                  alt={item?.title}
                  className="w-full h-full object-contain rounded-xl"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-slate-800 truncate">{item?.title}</h3>
                        {item?.productType && (
          <span
            className={`inline-block mt-1 text-xs px-2 py-1 rounded-full font-medium ${
              item.productType === "Book"
                ? "bg-green-100 text-green-700"
                : "bg-purple-100 text-purple-700"
            }`}
          >
            {item.productType === "Book" ? "Book" : "Digital Product"}
          </span>
        )}

                <p className="text-sm text-slate-500 mt-1">
                  Quantity: {item.quantity}
                </p>
                <p className="mt-2 font-semibold text-slate-700">
                  ₹{(item.price * item.quantity).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
      
     {/* Address Form */}
  {itemDetails?.productType === "Book" && showAddressForm && (
    <div className="mt-6">
      <h2 className="text-lg font-bold mb-2">Shipping Details</h2>
      <AddressForm
        onAddressChange={setShippingAddress}
        onValidChange={setIsAddressValid}
      />
    </div>
  )}
        </div>

        {/* RIGHT: Summary + Payment */}
        <div className="h-fit">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-slate-200/60 p-8 sticky top-32 space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-slate-800">Order Summary</h2>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium">₹{totals.subtotal?.toLocaleString()}</span>
              </div>
          {discountPrice > 0 && (
  <div className="flex justify-between text-green-600">
    <span>Discount</span>
    <span>-₹{discountPrice.toLocaleString()}</span>
  </div>
)}

              <div className="flex justify-between">
                <span>Shipping</span>
                <span className={totals.shipping === 0 ? "text-green-600 font-medium" : ""}>
                  {totals.shipping === 0 ? "FREE" : `₹${totals.shipping}`}
                </span>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-slate-800">Total</span>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  ₹{finalTotal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Promo Code */}
            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 px-4 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <button
                  onClick={handleApplyPromo}
                  disabled={loading}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium hover:scale-105 transition-transform"
                >
                  Apply
                </button>
              </div>
              {promoError && (
                <p className="text-red-500 text-sm flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" /> {promoError}
                </p>
              )}
            </div>

            {/* Pay Button */}
          <button
  onClick={handlePayClick}
  className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-semibold hover:scale-105 transition-transform shadow-lg flex items-center justify-center gap-2"
>
  <CreditCard className="w-5 h-5" />
  {loading ? "Processing..." : "Pay Securely"}
</button>


            <div className="text-xs text-slate-500 text-center">
              <Shield className="inline w-3 h-3 mr-1" />
              Payments are secured with SSL encryption
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



