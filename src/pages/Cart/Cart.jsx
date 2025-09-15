import { useEffect, useState } from "react";
import { useCart } from "../../context/cartContext"; 
import { Trash2, ShoppingBag, Plus, Minus, ArrowRight, Shield, Truck } from "lucide-react"; 
import toast, { Toaster } from "react-hot-toast";
import {useNavigate,Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";

export default function CartPage() {
  const { cart, fetchCart, updateQuantity, removeFromCart, loading } = useCart();
  const [localLoading, setLocalLoading] = useState(false);
  const [isCheckoutHovered, setIsCheckoutHovered] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
const { user } = useAuth();
const navigate = useNavigate();
  useEffect(() => {
    if (!user || !user.id) {
      navigate("/signin"); 
    }
  }, [user, navigate]);
  useEffect(() => {
    fetchCart();
    if (cart.length > 0 && !selectedProduct) {
      setSelectedProduct(cart[0]);
    }
  }, []);

useEffect(() => {
  if (cart.length > 0) {
    const stillExists = selectedProduct && cart.find(item => item.productId === selectedProduct.productId);
    if (!stillExists) {
      setSelectedProduct(cart[0]); 
    }
  } else {
    setSelectedProduct(null);
  }
}, [cart]);
console.log("hii the cart information is this :",cart)
let shipping = 0; 

const calculateTotals = (items) => {
  const subtotal = items.reduce(
    (acc, item) => acc + (item.price || 0) * (item.quantity || 0),
    0
  );

  const discount = items.reduce(
    (acc, item) =>
      acc +
      ((item.mrp || item.price || 0) - (item.price || 0)) *
        (item.quantity || 0),
    0
  );

  const total = subtotal + shipping;

  return { subtotal, discount, shipping, total };
};
  const allTotals = calculateTotals(cart);
  const selectedTotals = selectedProduct ? calculateTotals([selectedProduct]) : { subtotal: 0, discount: 0, shipping: 0, total: 0 };

  const handleQuantityChange = async (item, newQty) => { 
  if (newQty < 1) return;
  setLocalLoading(true);


  const currentSelectedId = selectedProduct?.productId;

  await updateQuantity(item.productId, newQty);
  await fetchCart();
  if (currentSelectedId) {
    const updatedItem = cart.find(i => i.productId === currentSelectedId);
    if (updatedItem) {
      setSelectedProduct(updatedItem);
    }
  }

  setLocalLoading(false);
};


  const handleRemove = async (item) => {
    setLocalLoading(true);
    await removeFromCart(item.productId);
    await fetchCart();
    setLocalLoading(false);
  };
console.log("selected product is :" , selectedProduct)
const handleCheckout = () => {
  if (selectedProduct && !selectedProduct.inStock) {
    toast.error("This product is out of stock. You cannot buy it.");
    return;
  }

  if (selectedProduct && cart.length > 1) {
    navigate("/checkout", { state: { cart: [selectedProduct], totals: selectedTotals } });
  } else {
    navigate("/checkout", { state: { cart, totals: allTotals } });
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-slate-200/60 sticky top-0 z-10">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Shopping Cart
              </h1>
              <p className="text-slate-500 text-sm">{cart.length} items in your cart</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {cart.length === 0 ? (
          <div className="max-w-md mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-slate-200/60 p-6 sm:p-12 text-center">
              <div className="w-24 h-24 mx-auto bg-gradient-to-r from-slate-100 to-slate-200 rounded-full flex items-center justify-center mb-6">
                <ShoppingBag className="w-12 h-12 text-slate-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-slate-800 mb-3">Your cart is empty</h3>
              <p className="text-slate-500 mb-6 sm:mb-8">Start shopping to add items to your cart</p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-medium hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base"
              >
                Continue Shopping
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 xl:gap-8">
            {/* Cart Items */}
            <div className="xl:col-span-2 space-y-3 sm:space-y-4">
              {cart.map((item, index) => (
                <div
                  key={item.productId}
                  className={`group bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer ${
                    selectedProduct?.productId === item.productId 
                      ? 'border-blue-500/60 ring-2 ring-blue-500/20 bg-blue-50/50' 
                      : 'border-slate-200/60'
                  }`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: 'fadeInUp 0.6s ease-out forwards'
                  }}
                  onClick={() => setSelectedProduct(item)}
                >
                  <div className="flex items-center gap-6">
                    {/* Product Image */}
                    <div className="relative">
                      {loading || localLoading ? (
                        <div className="w-20 h-20 sm:w-28 sm:h-28 bg-gradient-to-r from-slate-200 to-slate-300 animate-pulse rounded-2xl" />
                      ) : (
                        <div className="w-20 h-20 sm:w-28 sm:h-28 bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl p-2 group-hover:shadow-lg transition-shadow duration-300">
                          <img
                            src={item?.images?.[0] || item?.product?.images?.[0] || "/placeholder.png"}
                            alt={item?.title || item?.product?.title || "Product"}
                            className="w-full h-full object-contain rounded-xl"
                          />
                        </div>
                      )}
                      {item?.inStock && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className={`font-semibold text-sm sm:text-lg mb-0 transition-colors truncate ${
                          selectedProduct?.productId === item.productId 
                            ? 'text-blue-600' 
                            : 'text-slate-800 group-hover:text-blue-600'
                        }`}>
                        {item?.title || item?.product?.title}
                        </h3>
                        {selectedProduct?.productId === item.productId && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse flex-shrink-0"></div>
                        )}
                      </div>
                        {/* ✅ Product Type Badge */}

                       {/* ✅ Product Type Badge */}
  <div className="flex items-center gap-2 mb-3 flex-wrap">
    <span
      className={`text-xs px-2 py-1 rounded-full font-medium flex-shrink-0 ${
        item?.inStock
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
      }`}
    >
      {item?.inStock ? "In Stock" : "Out of Stock"}
    </span>

    {item?.productType && (
      <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 font-medium">
        {item.productType === "Book" ? "Book" : "Digital Product"}
      </span>
    )}
  </div>

                      <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                        <span className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                          ₹{item?.price || 0}
                        </span>
                        {item?.oldPrice && (
                          <span className="text-sm line-through text-slate-400">
                            ₹{item.oldPrice}
                          </span>
                        )}
                        {item?.oldPrice && (
                          <span className="text-xs sm:text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                            Save ₹{item.oldPrice - item.price}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Quantity Controls & Remove Button - Mobile Layout */}
                    <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 sm:gap-4">
                      <div className="flex items-center bg-slate-50 rounded-2xl p-1">
                        <button
                          className="p-1.5 sm:p-2 hover:bg-white rounded-xl transition-colors disabled:opacity-50 group"
                          onClick={() => handleQuantityChange(item, item.quantity - 1)}
                          disabled={loading || localLoading || item.quantity <= 1}
                        >
                          <Minus className="w-3 h-3 sm:w-4 sm:h-4 text-slate-600 group-hover:text-blue-600 transition-colors" />
                        </button>
                        <span className="px-2 sm:px-4 py-1 sm:py-2 font-semibold text-slate-800 min-w-[2rem] sm:min-w-[3rem] text-center text-sm sm:text-base">
                          {item?.quantity || 0}
                        </span>
                        <button
                          className="p-1.5 sm:p-2 hover:bg-white rounded-xl transition-colors disabled:opacity-50 group"
                          onClick={() => handleQuantityChange(item, item.quantity + 1)}
                          disabled={loading || localLoading}
                        >
                          <Plus className="w-3 h-3 sm:w-4 sm:h-4 text-slate-600 group-hover:text-blue-600 transition-colors" />
                        </button>
                      </div>

                      {/* Remove */}
                      <button
                        className="p-2 sm:p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200 disabled:opacity-50"
                        onClick={() => handleRemove(item)}
                        disabled={loading || localLoading}
                      >
                        <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="h-fit">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-slate-200/60 p-8 sticky top-32">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-800">Order Summary</h2>
                    {selectedProduct && (
                      <p className="text-sm text-slate-500">
                        {cart.length > 1 ? `Selected: ${selectedProduct.title || selectedProduct.product?.title}` : 'All items'}
                      </p>
                    )}
                  </div>
                </div>

                {cart.length > 1 && (
                  <div className="mb-6">
                    <div className="flex flex-col sm:flex-row gap-2 mb-4">
                      {/* <button
                        onClick={() => setSelectedProduct(null)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all text-center ${
                          !selectedProduct 
                            ? 'bg-blue-600 text-white shadow-lg' 
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        All Items ({cart.length})
                      </button> */}
                      <button
                        onClick={() => setSelectedProduct(cart.find(item => selectedProduct?.productId === item.productId) || cart[0])}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all text-center ${
                          selectedProduct 
                            ? 'bg-blue-600 text-white shadow-lg' 
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        Selected Item
                      </button>
                    </div>
                  </div>
                )}

              
                {(() => {
                  const totals = selectedProduct && cart.length > 1 ? selectedTotals : allTotals;
                  const itemCount = selectedProduct && cart.length > 1 ? 1 : cart.length;
                  
                  return (
                    <>
                      <div className="space-y-4 mb-6">
                        <div className="flex justify-between items-center">
                          <span className="text-slate-600">Subtotal ({itemCount} item{itemCount > 1 ? 's' : ''})</span>
                          <span className="font-semibold text-slate-800">₹{totals.subtotal.toLocaleString()}</span>
                        </div>
                        
                        {totals.discount > 0 && (
                          <div className="flex justify-between items-center">
                            <span className="text-slate-600">Discount</span>
                            <span className="font-semibold text-green-600">-₹{totals.discount.toLocaleString()}</span>
                          </div>
                        )}
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Truck className="w-4 h-4 text-slate-500" />
                            <span className="text-slate-600">Shipping</span>
                          </div>
                          <span className={`font-semibold ${totals.shipping === 0 ? 'text-green-600' : 'text-slate-800'}`}>
                            {totals.shipping === 0 ? 'FREE' : `₹${totals.shipping}`}
                          </span>
                        </div>
{/*                         
                        {totals.subtotal < 999 && (
                          <div className="text-xs text-amber-600 bg-amber-50 p-3 rounded-xl">
                            Add ₹{999 - totals.subtotal} more for FREE shipping
                          </div>
                        )} */}
                      </div>

                      <div className="border-t border-slate-200 pt-4 mb-6">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-semibold text-slate-800">Total</span>
                          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            ₹{totals.total.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </>
                  );
                })()}
<button
  className="w-full relative overflow-hidden px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:transform-none shadow-lg"
  disabled={loading || localLoading}
  onMouseEnter={() => setIsCheckoutHovered(true)}
  onMouseLeave={() => setIsCheckoutHovered(false)}
  onClick={handleCheckout}
>


  <div className="flex items-center justify-center gap-3 relative z-10">
    <span>Proceed to Checkout</span>
    <ArrowRight
      className={`w-5 h-5 transition-transform duration-300 ${
        isCheckoutHovered ? "translate-x-1" : ""
      }`}
    />
  </div>
  <div
    className={`absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 transition-opacity duration-300 rounded-2xl ${
      isCheckoutHovered ? "opacity-100" : "opacity-0"
    }`}
  ></div>
</button>



                <div className="mt-4 text-center text-xs text-slate-500">
                  <div className="flex items-center justify-center gap-1">
                    <Shield className="w-3 h-3" />
                    <span>Secure checkout with SSL encryption</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <Toaster position="top-right" reverseOrder={false} />
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}