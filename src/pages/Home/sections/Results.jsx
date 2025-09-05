// eslint-disable-next-line no-unused-vars
import { motion, useReducedMotion } from "framer-motion";

export default function Results() {
  const shouldReduceMotion = useReducedMotion();

  const headingVariants = {
    hidden: { x: -40, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  };

  const paragraph = "Join thousands of successful NEET aspirants who reached their peak with us";
  const paraChars = Array.from(paragraph);
  const baseParaDelay = 0.12;
  const charDelayStep = 0.02;

  const cardVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.36, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section className="relative w-full flex justify-center items-center bg-[url(/assets/checked_bg.webp)] bg-cover bg-center bg-no-repeat bg-clip-content bg-origin-content py-12 lg:py-0 lg:min-h-screen">
      <div className="max-w-5xl w-full text-center">
        {}
        {!shouldReduceMotion ? (
          <motion.h2
            className="font-extrabold leading-[1.25]
             text-2xl  
             sm:text-3xl
             md:text-4xl
             lg:text-5xl max-w-3xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            variants={headingVariants}
            style={{
              willChange: "transform, opacity",
              backfaceVisibility: "hidden",
              transformStyle: "preserve-3d",
              perspective: 1000,
            }}
          >
            <span className="text-black">Proven Results, Trusted by</span>{" "}
            <span className="block sm:inline text-[#4aa3ff]">Students</span>
          </motion.h2>
        ) : (
          <h2 className="font-extrabold leading-[1.25]
             text-2xl  
             sm:text-3xl
             md:text-4xl
             lg:text-5xl max-w-3xl mx-auto">
            <span className="text-black">Proven Results, Trusted by</span>{" "}
            <span className="block sm:inline text-[#4aa3ff]">Students</span>
          </h2>
        )}

        {}
        <p className="max-w-3xl mx-auto mt-4 text-sm sm:text-xl text-gray-700 font-semibold">
          {!shouldReduceMotion ? (
            <motion.span initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.35 }}>
              {paraChars.map((ch, i) => {
                const delay = baseParaDelay + i * charDelayStep;
                return (
                  <motion.span
                    key={`${ch}-${i}`}
                    className="inline-block whitespace-pre"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.22, delay, ease: "linear" }}
                    style={{ display: "inline-block", willChange: "opacity" }}
                  >
                    {ch}
                  </motion.span>
                );
              })}
            </motion.span>
          ) : (
            paragraph
          )}
        </p>

        {}
        <div className="mt-10 flex justify-center">
          <div className="relative w-full max-w-3xl">
            {!shouldReduceMotion ? (
              <motion.div
                className="bg-[#e9f5ff]/90 rounded-3xl px-8 py-12 sm:py-10 shadow-sm"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.35 }}
                variants={cardVariants}
              >
                {}
                <div className="flex justify-center mb-4">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <motion.svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-6 h-6 text-yellow-400 mx-0.5"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true, amount: 0.35 }}
                      transition={{ duration: 0.22, delay: 0.08 + i * 0.03 }}
                      aria-hidden
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.719c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </motion.svg>
                  ))}
                </div>

                {}
                <blockquote className="text-center text-base sm:text-lg font-medium text-gray-800 max-w-2xl mx-auto">
                  "Page-wise test generation was a game changer. I could focus on
                  my weak areas and track improvement systematically."
                </blockquote>

                {}
                <div className="mt-8 flex items-center justify-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-[#ffb74d]/30">
                    <img
                      src="/assets/avatar.jpg"
                      alt="Priya Patel"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-center">
                    <div className="text-xs font-extrabold text-gray-900">
                      Priya Patel
                    </div>
                    <div className="text-[11px] font-extrabold">
                      NEET Qualifier 2024
                    </div>
                    <div className="text-[11px] text-[#1281ef] font-extrabold">Score: 672/720</div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="bg-[#e9f5ff]/90 rounded-3xl px-8 py-12 sm:py-10 shadow-sm">
                <div className="flex justify-center mb-4">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-6 h-6 text-yellow-400 mx-0.5"
                      aria-hidden
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.719c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <blockquote className="text-center text-base sm:text-lg font-medium text-gray-800 max-w-2xl mx-auto">
                  "Page-wise test generation was a game changer. I could focus on
                  my weak areas and track improvement systematically."
                </blockquote>

                <div className="mt-8 flex items-center justify-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-[#ffb74d]/30">
                    <img
                      src="/assets/avatar.jpg"
                      alt="Priya Patel"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-center">
                    <div className="text-xs font-extrabold text-gray-900">
                      Priya Patel
                    </div>
                    <div className="text-[11px] font-extrabold">
                      NEET Qualifier 2024
                    </div>
                    <div className="text-[11px] text-[#1281ef] font-extrabold">Score: 672/720</div>
                  </div>
                </div>
              </div>
            )}
            <img
              src="/assets/loader.gif"
              alt="Loading indicator"
              className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 w-16 h-auto opacity-50"
            />
          </div>
        </div>
      </div>
    </section>
  );
}