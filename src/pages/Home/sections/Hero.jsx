import { IoIosRocket } from "react-icons/io";
// eslint-disable-next-line no-unused-vars
import { motion, useReducedMotion } from "framer-motion";

const headerVariants = {
  hidden: { x: -40, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.22,
      staggerChildren: 0.06,
    },
  },
};

const childVariants = {
  hidden: { y: 96, opacity: 0, scale: 0.98 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.62,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const paragraph = "Personalised. Performance-Focused. Proven";
  const chars = Array.from(paragraph);
  const baseParaDelay = 0.01;
  const useCharAnimation = !shouldReduceMotion;

  return (
    <section
      className="relative w-full flex justify-between items-center py-10 xl:px-20
                 bg-[url(/assets/checked_bg.webp)] bg-cover bg-center bg-no-repeat
                 bg-clip-content bg-origin-content min-h-screen px-5 max-[420px]:pt-0"
    >
      <div className="relative z-10 w-full">
        <div className="flex items-center flex-col md:flex-row gap-10 max-[520px]:gap-0 lg:justify-between">
          <div className="h-[420px] sm:h-[400px] lg:h-[520px] flex-shrink-0 max-[350px]:-mt-16">
            <img
              src="/assets/output.webp"
              alt="Student illustration"
              className="h-full w-auto object-contain"
            />
          </div>

          <div className="max-w-[500px] mb-30 mr-24 max-[1300px]:mr-0 max-[1300px]:mb-10 max-[420px]:-mt-10 max-[350px]:-mt-16">
            {}
            <motion.h1
              className="font-extrabold leading-[1.25] text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
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
              <span className="text-[#4B8DE0]">Neet Peak</span>
              <span className="text-gray-900"> — Your Path to NEET (UG) Mastery</span>
            </motion.h1>

            <div className="mt-4 text-sm sm:text-xl text-gray-700 overflow-hidden">
              <motion.p aria-label={paragraph} className="inline-block">
                {chars.map((ch, i) => {
                  const charDelay = baseParaDelay + i * 0.02;

                  if (!useCharAnimation) {
                    return (
                      <span key={`${ch}-${i}`} className="inline-block whitespace-pre">
                        {ch}
                      </span>
                    );
                  }

                  return (
                    <motion.span
                      key={`${ch}-${i}`}
                      className="inline-block whitespace-pre"
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.35 }}
                      transition={{
                        duration: 0.22,
                        delay: charDelay,
                        ease: "linear",
                      }}
                      style={{ display: "inline-block", willChange: "transform, opacity" }}
                    >
                      {ch}
                    </motion.span>
                  );
                })}
              </motion.p>
            </div>

            <motion.div
              className="mt-8 overflow-hidden"
              initial="hidden"
              whileInView="visible"
              variants={shouldReduceMotion ? { hidden: {}, visible: {} } : containerVariants}
              viewport={{ once: true, amount: 0.35 }}
            >
              <div className="flex flex-wrap items-center gap-4">
                <motion.button
                  type="button"
                  variants={shouldReduceMotion ? { hidden: {}, visible: {} } : childVariants}
                  style={{ willChange: "transform, opacity" }}
                  className="inline-flex items-center gap-2 rounded-xl px-3 py-2 max-sm:text-sm sm:px-6 sm:py-3 font-extrabold text-white
                             bg-gradient-to-t from-[#39538D] via-[#3B5A94] to-[#4FA2D5] cursor-pointer
                             hover:brightness-110 focus:outline-none"
                >
                  Start Learning
                  <IoIosRocket className="w-5 h-5" />
                </motion.button>

                {/* <motion.button
                  type="button"
                  variants={shouldReduceMotion ? { hidden: {}, visible: {} } : childVariants}
                  style={{ willChange: "transform, opacity" }}
                  className="rounded-2xl px-3 py-2 max-sm:text-sm sm:px-6 sm:py-3 font-extrabold text-sky-800 bg-[#C2E2FF]
                             hover:bg-sky-200 focus:outline-none"
                >
                  Try Free Lesson
                </motion.button> */}
              </div>
            </motion.div>
          </div>
        </div>

        <img
          src="/assets/loader.gif"
          alt="Loading indicator"
          className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 w-16 h-auto opacity-50"
        />
      </div>
    </section>
  );
}