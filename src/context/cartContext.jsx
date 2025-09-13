import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./authContext";
import { useCartApi } from "../Services/cartApi";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (isAuthenticated && user?.id) {
      fetchCart();
    } else {
      setCart([]);
    }
  }, [isAuthenticated, user]);


  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await useCartApi.getcart(user.id);
      if (res.success) {
        setCart(res.data.items || []);
      } else {
        toast.error(res.message || "Failed to load cart");
      }
    } catch (err) {
      console.error("Fetch cart failed:", err);
      toast.error("Could not load cart");
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product) => {
    if (!user?.id) {
      navigate("/signin");
      return;
    }

    setLoading(true);
    try {
      const res = await useCartApi.addToCart(user.id, product._id);
      if (res.success) {
        console.log("Add to cart response:", res);
        setCart(res.cart.items || []); 
        toast.success("Product added to cart");
      } else {
        toast.error(res.message || "Failed to add to cart");
      }
    } catch (err) {
      console.error("Add to cart failed:", err);
      toast.error("Could not add to cart");
    } finally {
      setLoading(false);
    }
  };


  const removeFromCart = async (productId) => {
    if (!user?.id) return;

    setLoading(true);
    try {
      const res = await useCartApi.removeFromCart(user.id, productId);
      if (res.success) {
        setCart(res.data.items || []);
        toast.info("Product removed from cart");
      } else {
        toast.error(res.message || "Failed to remove product");
      }
    } catch (err) {
      console.error("Remove cart item failed:", err);
      toast.error("Could not remove product");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Update quantity
  const updateQuantity = async (productId, quantity) => {
    if (!user?.id) return;

    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }

    setLoading(true);
    try {
      const res = await useCartApi.updateQuintity(user.id, productId, quantity);
      if (res.success) {
        setCart(res.data.items || []);
        toast.success("Cart updated");
      } else {
        toast.error(res.message || "Failed to update cart");
      }
    } catch (err) {
      console.error("Update cart failed:", err);
      toast.error("Could not update cart");
    } finally {
      setLoading(false);
    }
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        loading,
        fetchCart,
        addToCart,
        removeFromCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
