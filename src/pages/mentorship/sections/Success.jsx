// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const containerVariant = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.02,
      delayChildren: 0.15,
    },
  },
};

const headerVariants = {
  hidden: { x: -40, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};


export default function Success() {
    const navigate = useNavigate();
  const handleClick = () => {
    console.log("Button clicked!");
    navigate("/mentorship-call-checkout");
  }
  return (
    <section className="w-full flex justify-center py-8 px-4 md:px-8">
      <div className="max-w-3xl relative w-full">
              <div className="mx-4 md:mx-0">
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={containerVariant}
                  className="rounded-2xl border border-blue-300 overflow-hidden bg-[#C2E2FF] shadow-sm p-8 md:p-12"
                >
                  <div className="text-center md:text-left">
                     <motion.h1
                                  className="font-extrabold leading-[1.25] text-2xl sm:text-3xl md:text-4xl text-center"
                                  initial="hidden"
                                  whileInView="visible"
                                  viewport={{ once: true, amount: 0.35 }}
                                  variants={headerVariants}
                                  style={{
                                    willChange: "transform, opacity",
                                    backfaceVisibility: "hidden",
                                    transformStyle: "preserve-3d",
                                    perspective: 1000,
                                  }}
                                >
                                  <span className="text-gray-900">Your NEET Success Starts with the </span>
                                  <span className="text-[#4B8DE0]">Right Mentor</span>
                                </motion.h1>
                  </div>
              <div className="w-[220px] max-[1010px]:w-[100px] max-[1010px]:-right-2 max-[1010px]:top-[80px] absolute top-10 -right-26 max-[410px]:hidden">
                <img
                  src="/assets/globe.png"
                  alt="Globe"
                />
              </div>
                </motion.div>

                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 90, damping: 12, delay: 0.9 }}
                  className="flex justify-center md:justify-start mt-6 mx-auto"
                >
                  <button
                    aria-label="Book Demo Call"
                    className="inline-flex items-center gap-2 rounded-xl px-3 py-2 max-sm:text-sm sm:px-6 sm:py-3 font-extrabold text-white
                             bg-gradient-to-t from-[#39538D] via-[#3B5A94] to-[#4FA2D5] cursor-pointer
                             hover:brightness-110 focus:outline-none mx-auto"
                             onClick={() => handleClick()}
                  >
                    Book Demo Call @ ₹199
                  </button>
                </motion.div>
          </div>
      </div>
    </section>
  );
}
