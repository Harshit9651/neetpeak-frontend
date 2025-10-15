import { Link } from "react-router-dom";
import { TfiFacebook } from "react-icons/tfi";
import { FaInstagram } from "react-icons/fa";
import { motion, useReducedMotion } from "framer-motion";

export default function Footer() {
  const shouldReduceMotion = useReducedMotion();

  const playstoreVariants = {
    hidden: { y: 40, opacity: 0, scale: 0.96 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.15 },
    },
  };

  return (
    <footer className="relative isolate text-[15px] leading-relaxed bg-gradient-to-t from-[#374681] via-[#4271A9] to-[#4B96CA] p-4 sm:p-10">
      <div className="relative xl:px-20 overflow-hidden max-[950px]:py-10 max-[510px]:py-20">
        <div className="mx-auto lg:w-[min(94%,1250px)] px-4 md:px-6 relative z-10 py-6 md:py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-14 py-6 lg:py-16 px-2 sm:px-10">
            
            {/* Logo + About */}
            <div className="col-span-1 lg:col-span-2">
              <img src="/assets/logo.png" alt="Neet Peak" className="h-20 w-auto" />
              <p className="mt-6 max-w-[380px] text-sky-100 font-semibold text-[16px]">
                Empowering NEET aspirants to reach the summit of their preparation with innovative tools, proven strategies, and personalized learning paths.
              </p>
              <div className="mt-6 flex items-center gap-x-3">
                <Link to="#" aria-label="Facebook" className="text-sky-200 hover:text-white">
                  <TfiFacebook className="h-8 w-8" />
                </Link>
                <Link to="#" aria-label="Instagram" className="text-sky-200 hover:text-white">
                  <FaInstagram className="h-8 w-8" />
                </Link>
              </div>
            </div>

            {/* Quick Links */}
            <div className="flex flex-col items-start justify-center col-span-1">
              <h4 className="font-bold text-white text-lg">Quick Links</h4>
              <ul className="mt-4 space-y-2">
                <li><Link to="/" className="text-sky-200 hover:text-white hover:underline">Home</Link></li>
                <li><Link to="/programs" className="text-sky-200 hover:text-white hover:underline">Programs</Link></li>
                <li><Link to="/features" className="text-sky-200 hover:text-white hover:underline">Features</Link></li>
                <li><Link to="/success-stories" className="text-sky-200 hover:text-white hover:underline">Success Stories</Link></li>
              </ul>
            </div>

            {/* Support Links */}
            <div className="flex flex-col items-start justify-center col-span-1">
              <h4 className="font-bold text-white text-lg">Support</h4>
              <ul className="mt-4 space-y-2">
                <li><Link to="/resources" className="text-sky-200 hover:text-white hover:underline">Free Resources</Link></li>
                <li><Link to="/pricing" className="text-sky-200 hover:text-white hover:underline">Pricing</Link></li>
                <li><Link to="/contact" className="text-sky-200 hover:text-white hover:underline">Contact Us</Link></li>
                <li><Link to="/faq" className="text-sky-200 hover:text-white hover:underline">FAQ</Link></li>
              </ul>
            </div>

            {/* App Download */}
            <div className="flex flex-col items-center justify-center col-span-1 sm:col-span-2 lg:col-span-1">
              <p className="text-sm text-sky-200 font-bold">Download Our App now and start learning!</p>

              {!shouldReduceMotion ? (
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.35 }}
                  variants={playstoreVariants}
                  style={{ willChange: "transform, opacity" }}
                  className="inline-block mt-5 bg-black rounded-2xl p-2"
                >
                  <Link to="/download">
                    <img src="/assets/playstore.png" alt="Get it on Google Play" className="xl:h-12 w-auto h-8" />
                  </Link>
                </motion.div>
              ) : (
                <Link to="/download" className="inline-block mt-5 bg-black rounded-2xl p-2">
                  <img src="/assets/playstore.png" alt="Get it on Google Play" className="xl:h-12 w-auto h-8" />
                </Link>
              )}
            </div>
          </div>

          <hr className="border-t border-sky-300 w-full" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-5 text-sm w-full">
            <p className="text-sky-100 max-[385px]:text-center">© 2025 Neet Peak. All Rights Reserved.</p>
            <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-2 text-sky-100">
              <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white">Terms of Service</Link></li>
              <li><Link to="/cookies" className="hover:text-white">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
