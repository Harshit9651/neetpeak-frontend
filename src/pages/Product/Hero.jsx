import { motion, useReducedMotion } from "framer-motion";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const sectionVariants = {
    hidden: { y: -40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <div
      className="relative w-full flex flex-col justify-center items-center text-center
                 bg-[url(/assets/checked_bg.webp)] bg-cover bg-center bg-no-repeat
                 min-h-screen px-4 sm:px-6 lg:px-12 py-16"
    >
      {/* Heading */}
      {!shouldReduceMotion ? (
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
        >
          Choose Your <span className="text-[#4fa3ff]">Learning Path</span>
        </motion.h1>
      ) : (
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
          Choose Your <span className="text-[#4fa3ff]">Learning Path</span>
        </h1>
      )}

      {/* Sub Text */}
      <p className="mt-5 max-w-2xl mx-auto text-base md:text-lg text-gray-600 font-medium">
        Learn the way you like. Either get high-quality{" "}
        <strong>printed study materials</strong> delivered to your doorstep,
        or access our <strong>digital products</strong> instantly.
      </p>

      {/* Buttons */}
      <div className="mt-8 flex justify-center gap-4 flex-wrap">
        <button className="px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-t from-[#39538D] via-[#3B5A94] to-[#4FA2D5] hover:brightness-110 transition">
          Get Hard Books
        </button>
        <button className="px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-t from-[#39538D] via-[#3B5A94] to-[#4FA2D5] hover:brightness-110 transition">
          Get Digital Products
        </button>
      </div>
    </div>
  );
}
