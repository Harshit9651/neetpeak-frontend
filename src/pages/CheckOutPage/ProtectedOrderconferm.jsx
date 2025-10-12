import { useLocation, Navigate } from "react-router-dom";
import OrderConfirmation from "./OrderConfermation";

export default function ProtectedOrderConfirmation() {
  const location = useLocation();
  const orderData = location.state;

  // Prevent direct access
  if (!orderData) {
    return <Navigate to="/" replace />;
  }

  return <OrderConfirmation orderData={orderData} />;
}
