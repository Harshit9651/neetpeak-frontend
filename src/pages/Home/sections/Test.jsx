// eslint-disable-next-line no-unused-vars
import { motion, useReducedMotion } from "framer-motion";
import WaveCardCarousel from "../../../components/wavecardcarousel/WaveCardCarousel";

export default function Test() {
  const shouldReduceMotion = useReducedMotion();

  const headerVariants = {
    hidden: { x: -40, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  };

  const part1 = "Tailored programs designed to elevate your NEET preparation to new";
  const part2 = "heights";

  const baseParaDelay = 0.18;
  const charDelayStep = 0.02; 

  function AnimatedText({ text, startDelay = 0 }) {
    if (shouldReduceMotion) return <>{text}</>; 
    return (
      <>
        {Array.from(text).map((ch, i) => {
          const delay = startDelay + i * charDelayStep;
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
      </>
    );
  }

  const part1Duration = part1.length * charDelayStep;
  const part2StartDelay = baseParaDelay + part1Duration + 0.06;

  return (
    <div className="lg:py-20 ">
      <motion.h1
        className="font-extrabold leading-[1.25]
             text-2xl   // base: mobile
             sm:text-3xl
             md:text-4xl
             lg:text-5xl
             text-center"
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
        <span className="text-gray-900">
          {" "}
          Choose Your <span className="text-[#4B8DE0]">Peak</span> Path
        </span>
      </motion.h1>

      <p className="mt-3 sm:mt-6 text-center text-gray-700 text-pretty font-semibold text-base sm:text-lg md:text-xl max-w-[890px] mx-auto">
        <motion.span initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.35 }}>
          <AnimatedText text={part1} startDelay={baseParaDelay} />
        </motion.span>

        <br className="hidden xl:block" />

        <motion.span initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.35 }}>
          <AnimatedText text={part2} startDelay={part2StartDelay} />
        </motion.span>
      </p>

      <div className="mt-10">
        <WaveCardCarousel />
      </div>
    </div>
  );
}
