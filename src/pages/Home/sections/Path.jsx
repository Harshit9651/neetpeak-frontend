// eslint-disable-next-line no-unused-vars
import { motion, useReducedMotion } from "framer-motion";

export default function Path() {
  const shouldReduceMotion = useReducedMotion();

  const headerVariants = {
    hidden: { x: -40, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  };

  const buttonVariants = {
    hidden: { y: 72, opacity: 0, scale: 0.98 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1], delay: 0.28 },
    },
  };

  const paragraph = "A simple 5-step journey to NEET success with our proven methodology";
  const chars = Array.from(paragraph);
  const baseParaDelay = 0.18;
  const charDelayStep = 0.02;

  const stepVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, delay: 0.45 + i * 0.06, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <section className="w-full px-4 sm:px-6 lg:px-16 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {}
        <div className="order-1">
          {}
          {!shouldReduceMotion ? (
            <motion.h3
              className="font-extrabold leading-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
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
              Your Path to the <span className="text-[#4aa3ff]">Peak</span>
            </motion.h3>
          ) : (
            <h3 className="font-extrabold leading-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
              Your Path to the <span className="text-[#4aa3ff]">Peak</span>
            </h3>
          )}

          {}
          <p className="mt-6 max-w-xl text-gray-700 font-medium text-base sm:text-lg md:text-xl">
            {!shouldReduceMotion ? (
              <motion.span initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.35 }}>
                {chars.map((ch, i) => (
                  <motion.span
                    key={`${ch}-${i}`}
                    className="inline-block whitespace-pre"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.22, delay: baseParaDelay + i * charDelayStep, ease: "linear" }}
                    style={{ display: "inline-block", willChange: "opacity" }}
                  >
                    {ch}
                  </motion.span>
                ))}
              </motion.span>
            ) : (
              paragraph
            )}
          </p>

          {}
          {!shouldReduceMotion ? (
            <motion.div
              className="mt-8 flex flex-col sm:flex-row sm:items-center sm:gap-4 overflow-hidden"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
            >
              <motion.a
                href="#"
                aria-label="Download the NEET guide"
                className="inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm sm:text-base font-extrabold text-white bg-gradient-to-t from-[#39538D] via-[#3B5A94] to-[#4FA2D5] hover:brightness-110 transition"
                variants={buttonVariants}
                style={{ willChange: "transform, opacity" }}
              >
                Download Now
              </motion.a>
            </motion.div>
          ) : (
            <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:gap-4">
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm sm:text-base font-extrabold text-white bg-gradient-to-t from-[#39538D] via-[#3B5A94] to-[#4FA2D5] hover:brightness-110 transition"
                aria-label="Download the NEET guide"
              >
                Download Now
              </a>
            </div>
          )}

          {}
          <div className="mt-8 grid grid-cols-3 gap-3 sm:hidden">
            {["Plan", "Practice", "Review"].map((label, i) =>
              !shouldReduceMotion ? (
                <motion.div
                  key={label}
                  className="flex flex-col items-center"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.35 }}
                  custom={i}
                  variants={stepVariants}
                  style={{ willChange: "transform, opacity" }}
                >
                  <div className="w-10 h-10 rounded-full bg-[#4aa3ff]/20 flex items-center justify-center font-bold text-[#39538D]">
                    {i + 1}
                  </div>
                  <span className="text-xs mt-2">{label}</span>
                </motion.div>
              ) : (
                <div key={label} className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-[#4aa3ff]/20 flex items-center justify-center font-bold text-[#39538D]">
                    {i + 1}
                  </div>
                  <span className="text-xs mt-2">{label}</span>
                </div>
              )
            )}
          </div>
        </div>

        {}
        <div className="order-2 flex justify-center lg:justify-end">
          <figure className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
            <img
              src="/assets/pyramid.svg"
              alt="Five-step pyramid showing progress toward NEET peak"
              className="w-full h-auto object-contain"
            />
          </figure>
        </div>
      </div>
    </section>
  );
}