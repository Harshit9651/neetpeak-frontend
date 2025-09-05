import { IoIosRocket } from "react-icons/io";
// eslint-disable-next-line no-unused-vars
import { motion, useReducedMotion } from "framer-motion";

const headerVariants = {
  hidden: { x: -120, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const buttonVariants = {
  hidden: { y: 96, opacity: 0, scale: 0.98 },
  visible: (delay = 0) => ({
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

export default function Secondary() {
  const shouldReduceMotion = useReducedMotion();

  const paragraph = "Complete NCERT coverage with detailed explanations for every concept";
  const paraChars = Array.from(paragraph);
  const baseParaDelay = 0.22; 
  const charDelayStep = 0.02;

  const stat1 = "1M+ Downloads";
  const stat2 = "10K+ Reviews";

  const paragraphDurationApprox = paraChars.length * charDelayStep;
  const statsStartDelay = baseParaDelay + paragraphDurationApprox + 0.06;

  function AnimatedText({ text, startDelay = 0 }) {
    const chars = Array.from(text);

    if (shouldReduceMotion) {
      return <>{text}</>;
    }

    return (
      <>
        {chars.map((ch, i) => {
          const delay = startDelay + i * charDelayStep;
          return (
            <motion.span
              key={`${ch}-${i}`}
              className="inline-block whitespace-pre"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{
                duration: 0.22,
                delay,
                ease: "linear",
              }}
              style={{ display: "inline-block", willChange: "opacity" }}
            >
              {ch}
            </motion.span>
          );
        })}
      </>
    );
  }

  return (
    <section className="relative w-full flex items-center justify-center min-h-screen pb-14 max-[640px]:pb-4 overflow-hidden">
      <div className="relative z-10 container mx-auto px-6 lg:px-20">
        <div className="flex flex-col-reverse md:flex-row items-center gap-10 md:gap-20">
          <div className="max-w-[500px] mb-30 ml-24 flex flex-col justify-center max-[1300px]:ml-0 max-[1300px]:mb-10 max-[420px]:-mt-10 max-[350px]:-mt-16">
            {}
            <motion.h1
              className="font-extrabold leading-[1.25] text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
              variants={headerVariants}
            >
              <span className="text-[#4B8DE0]">Neet Peak -</span>
              <span className="text-gray-900"> Line-by-Line NCERT for NEET</span>
            </motion.h1>

            {}
            <div className="mt-4 text-sm sm:text-xl text-gray-700 overflow-hidden">
              <motion.p aria-label={paragraph} className="inline-block">
                <AnimatedText text={paragraph} startDelay={baseParaDelay} />
              </motion.p>
            </div>

            {}
            <div className="flex flex-wrap w-full h-fit gap-4 mt-6">
              <p>
                <span className="font-extrabold text-md">
                  <AnimatedText text={stat1} startDelay={statsStartDelay} />
                </span>
              </p>

              <p>
                <span className="font-extrabold text-md">
                  <AnimatedText text={stat2} startDelay={statsStartDelay + 0.1} />
                </span>
              </p>
            </div>

            {}
            <motion.div
              className="mt-12 flex flex-wrap items-center gap-4 max-[640px]:mt-6 overflow-hidden"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
            >
              <motion.button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl px-3 py-2 max-sm:text-sm sm:px-10 sm:py-3 font-extrabold text-white bg-gradient-to-t from-[#39538D] via-[#3B5A94] to-[#4FA2D5] cursor-pointer hover:brightness-110 focus:outline-none"
                custom={0.55}
                variants={buttonVariants}
                style={{ willChange: "transform, opacity" }}
              >
                <IoIosRocket className="w-5 h-5" />
                Download Now
              </motion.button>
            </motion.div>
          </div>

          <div className="w-full md:w-1/2 flex justify-center items-start">
            <div className="relative">
              <div className="w-[260px] sm:w-[300px] md:w-[360px] lg:w-[420px]">
                <img
                  src="/assets/mobile.webp"
                  alt="App screenshot"
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}