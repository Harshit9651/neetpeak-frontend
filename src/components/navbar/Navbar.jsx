import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiMenu, FiX, FiShoppingCart, FiDownload, FiLogOut } from "react-icons/fi";

import { useCart } from "../../context/cartContext";
import {useAuth} from "../../context/authContext"

const navItems = [
  { to: "/", label: "Home" },
  { to: "/product", label: "Product" },
  { to: "/mentorship", label: "Mentorship" },
  { to: "/aboutus", label: "About Us" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const {user,logout} = useAuth()


  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);
  const { cartCount } = useCart();

  return (
    <header className="sticky top-4 z-50 mx-auto w-[min(96%,900px)] border-[1px] rounded-2xl overflow-hidden">
      <div className="bg-white/90 backdrop-blur">
        <div className="flex items-center justify-between px-4 sm:px-6 py-3">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img
              src="/assets/logo.png"
              alt="Neet Peak Logo"
              className="h-[40px]"
            />
            <span className="hidden xs:block font-extrabold tracking-tight text-lg sm:text-xl">
              NEET <span className="text-sky-500">PEAK</span>
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-x-12">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `font-semibold text-base tracking-tight transition relative after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-sky-500 after:transition-[width] hover:after:w-full ${
                    isActive ? "text-sky-600 after:w-full" : "text-gray-800"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* DESKTOP BUTTONS */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              to="/download"
              className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 font-bold text-white bg-[#50A8DA] hover:bg-sky-600 active:scale-[0.99] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-500"
            >
              Download App
            </Link>
{user ? (
  <button
    onClick={logout}
    className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 font-bold text-white bg-[#4B8DE0] hover:bg-blue-700 active:scale-[0.99] transition"
  >
    <FiLogOut className="h-5 w-5" />
  </button>
) : (
  <Link
    to="/signup"
    className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 font-bold text-white bg-[#4B8DE0] hover:bg-blue-700 active:scale-[0.99] transition"
  >
    Sign Up
  </Link>
)}



            <Link to="/mycart" className="relative p-2 rounded-xl hover:bg-sky-50 transition">
              <FiShoppingCart className="text-sky-600 h-6 w-6" aria-hidden />
               {cartCount > 0 && (
    <span className="absolute -top-1 -right-1 grid place-items-center rounded-full bg-blue-700 text-white text-[10px] font-bold h-5 w-5">
      {cartCount}
    </span>
  )}
            </Link>
          </div>

          {/* MOBILE TOGGLE BUTTON */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden inline-flex items-center justify-center rounded-xl p-2.5 hover:bg-sky-50  focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
            aria-expanded={open}
            aria-label="Toggle navigation"
          >
            {open ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
          </button>
        </div>

        {/* MOBILE MENU */}
        <div
          className={`lg:hidden overflow-hidden transition-[max-height] duration-300 ${
            open ? "max-h-96" : "max-h-0"
          }`}
          aria-hidden={!open}
        >
          <nav className="px-4 sm:px-6 pb-4 flex flex-col gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-xl px-3 py-2 text-base font-semibold transition hover:bg-sky-50 ${
                    isActive ? "text-sky-700 bg-sky-50" : "text-gray-900"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}

            {/* Mobile Buttons */}
            <div className="mt-3 flex flex-col gap-3">
              <Link
                to="/download"
                className="inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2.5 font-bold text-white bg-sky-500 hover:bg-sky-600 active:scale-[0.99] transition"
                onClick={() => setOpen(false)}
              >
                <FiDownload aria-hidden />
                Download App
              </Link>

      {user ? (
  <button
    onClick={() => {
      logout();
      setOpen(false);
    }}
    className="inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2.5 font-bold text-white bg-red-500 hover:bg-red-600 active:scale-[0.99] transition"
  >
    <FiLogOut className="h-5 w-5" />
    Logout
  </button>
) : (
  <Link
    to="/signup"
    className="inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2.5 font-bold text-white bg-[#4B8DE0] hover:bg-blue-700 active:scale-[0.99] transition"
    onClick={() => setOpen(false)}
  >
    Sign Up
  </Link>
)}


         <Link
  to="/mycart"
  className="relative self-center p-2 rounded-xl hover:bg-sky-50"
  onClick={() => setOpen(false)}
>
  <FiShoppingCart className="text-sky-600 h-6 w-6" aria-hidden />
  {cartCount > 0 && (
    <span className="absolute -top-1 -right-1 grid place-items-center rounded-full bg-blue-700 text-white text-[10px] font-bold h-5 w-5">
      {cartCount}
    </span>
  )}
</Link>

            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
