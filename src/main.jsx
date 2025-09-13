import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/cartContext.jsx";
import { AuthProvider } from "./context/authContext";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
    <CartProvider>
      {" "}
      <App />{" "}
    </CartProvider>
    </AuthProvider>
  </BrowserRouter>
);
