// eslint-disable-next-line no-unused-vars
import { motion, useReducedMotion } from "framer-motion";

export default function Ready() {
  const shouldReduceMotion = useReducedMotion();

  const headerVariants = {
    hidden: { x: -40, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  };

  const buttonVariants = {
    hidden: { y: 72, opacity: 0, scale: 0.98 },
    visible: (i = 0) => ({
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1], delay: 0.22 + i * 0.08 },
    }),
  };

  const paragraph =
    "Join 50,000+ students who transformed their NEET preparation with our proven system. Start your journey to medical college today.";
  const chars = Array.from(paragraph);
  const baseParaDelay = 0.10;   
  const charDelayStep = 0.012;  

  const charVariants = {
    hidden: { opacity: 0 },
    visible: (i = 0) => ({
      opacity: 1,
      transition: { duration: 0.16, delay: baseParaDelay + i * charDelayStep, ease: "linear" },
    }),
  };

  return (
    <section className="w-full bg-[#f0f8ff] py-10 lg:py-30">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {}
        <div>
          {}
          {!shouldReduceMotion ? (
            <motion.h1
              className="font-extrabold leading-[1.25]
               text-2xl
               sm:text-3xl
               md:text-4xl
               lg:text-5xl"
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
              <span>Ready to Reach Your</span>
              <span className="ml-3 text-[#5aa0e6]"> Peak?</span>
            </motion.h1>
          ) : (
            <h1
              className="font-extrabold leading-[1.25]
               text-2xl
               sm:text-3xl
               md:text-4xl
               lg:text-5xl"
            >
              <span>Ready to Reach Your</span>
              <span className="ml-3 text-[#5aa0e6]"> Peak?</span>
            </h1>
          )}

          {}
          <p className="mt-4 text-sm sm:text-xl text-gray-700 font-semibold max-w-xl">
            {!shouldReduceMotion ? (

              <motion.span initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.35 }}>
                {chars.map((ch, i) => (
                  <motion.span
                    key={`${ch}-${i}`}
                    className="inline-block whitespace-pre"
                    variants={charVariants}
                    custom={i}
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
          <div className="mt-8 flex flex-wrap gap-4 overflow-hidden">
            {!shouldReduceMotion ? (
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.35 }}>
                <motion.button
                  type="button"
                  custom={0}
                  variants={buttonVariants}
                  style={{ willChange: "transform, opacity" }}
                  className="inline-flex items-center gap-2 rounded-xl px-3 py-2 max-sm:text-sm sm:px-6 sm:py-3 font-extrabold text-white
                              bg-gradient-to-t from-[#39538D] via-[#3B5A94] to-[#4FA2D5] cursor-pointer
                              hover:brightness-110 transition"
                >
                  Start Learning
                </motion.button>

                <motion.button
                  type="button"
                  custom={1}
                  variants={buttonVariants}
                  style={{ willChange: "transform, opacity" }}
                  className="px-6 py-3 rounded-2xl bg-[#C2E2FF] text-[#1e73c9] font-extrabold  ml-4"
                >
                  Try Free Lesson
                </motion.button>
              </motion.div>
            ) : (
              <>
                <button className="inline-flex items-center gap-2 rounded-xl px-3 py-2 max-sm:text-sm sm:px-6 sm:py-3 font-extrabold text-white
                              bg-gradient-to-t from-[#39538D] via-[#3B5A94] to-[#4FA2D5] cursor-pointer
                              hover:brightness-110 transition">
                  Start Learning
                </button>
                <button className="px-6 py-3 rounded-2xl bg-[#C2E2FF] text-[#1e73c9] font-extrabold">
                  Try Free Lesson
                </button>
              </>
            )}
          </div>
        </div>

        {}
        <div className="flex justify-center lg:justify-end">
          <div className="relative w-64 sm:w-72 md:w-80 lg:w-96 h-[420px] md:h-[620px] rounded-3xl border-4 border-black/80 bg-white shadow-[0_25px_50px_rgba(0,0,0,0.08)] overflow-hidden">
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-3 rounded-full bg-gray-200" />
            <div className="absolute inset-6 rounded-2xl bg-gradient-to-b from-white to-[#f7fbff] overflow-hidden p-4 flex flex-col">
              <div className="h-12 rounded-md bg-gray-100 flex items-center justify-center text-sm text-gray-400">
                App Header Placeholder
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 flex-1">
                <div className="rounded-md bg-gray-50 p-3 text-xs text-gray-500">No Data</div>
                <div className="rounded-md bg-gray-50 p-3 text-xs text-gray-500">No Data</div>
                <div className="rounded-md bg-gray-50 p-3 text-xs text-gray-500">No Data</div>
                <div className="rounded-md bg-gray-50 p-3 text-xs text-gray-500">No Data</div>
              </div>
              <div className="mt-4 h-14 rounded-md bg-gray-100 flex items-center justify-center text-sm text-gray-400">
                Bottom Nav Placeholder
              </div>
            </div>
            <div className="absolute left-0 top-0 bottom-0 w-4 bg-black/5 rounded-l-3xl" />
            <div className="absolute right-0 top-0 bottom-0 w-4 bg-black/5 rounded-r-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}