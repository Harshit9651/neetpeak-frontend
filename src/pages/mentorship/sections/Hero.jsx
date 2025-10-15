// eslint-disable-next-line no-unused-vars
import { motion, useReducedMotion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  // TEXTS
  const headingLeft = "Personalized NEET ";
  const headingRight = "Mentorship";
  const paragraph =
    "1-on-1 guidance from top NEET achievers to help you stay consistent, confident, and exam-ready.";
  const blueHeading = "Not Sure? Book a Demo Call";
  const bluePara =
    "Get a 20-min personalized session with our expert mentor to see how structured guidance can transform your NEET prep.";

  // SPEED / TUNING
  // smaller step = faster spread. change these to taste.
  const charDelayStep = 0.01; // time between each character
  const charDuration = 0.12; // duration of each char animation
  const headingCharDuration = 0.14;

  // helpers
  const chars = Array.from(paragraph);
  const headingLeftChars = Array.from(headingLeft);
  const headingRightChars = Array.from(headingRight);
  const blueHeadingChars = Array.from(blueHeading);
  const blueParaChars = Array.from(bluePara);
  const navigate = useNavigate();
  const handleClick = () => {
    console.log("Button clicked!");
    navigate("/mentorship-call-checkout");
  }

  // if user prefers reduced motion, render plain accessible text
  if (shouldReduceMotion) {
    return (
      <div className="relative w-full flex justify-center items-center py-10 bg-[url(/assets/checked_bg.webp)] bg-cover bg-center bg-no-repeat bg-clip-content bg-origin-content min-h-screen px-10 max-[630px]:px-0 max-[420px]:pt-0">
        <div className="w-full">
          <header className="text-center px-4 md:px-0 mt-0 lg:mt-16">
            <h1 className="font-extrabold leading-[1.25] text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
              <span>{headingLeft}</span>
              <span className="text-blue-500">{headingRight}</span>
            </h1>

            <div className="mt-4 text-sm sm:text-xl text-gray-700">
              <p>{paragraph}</p>
            </div>
          </header>

          <section className="mt-10 flex gap-6 items-start justify-center px-4 md:px-0">
            <div className="my-auto">
              <img src="/assets/hero_pic.png" alt="" />
            </div>

            <div className="flex items-center justify-center">
              <div className="w-full">
                <div className="relative">
                  <div className="bg-[#4B8DE0] text-white rounded-l-[28px] md:rounded-l-[42px] p-8 md:p-12 shadow-md">
                    <h2 className="font-bold text-2xl md:text-3xl lg:text-5xl">{blueHeading}</h2>
                    <p className="mt-4 text-sm md:text-lg max-w-4xl">{bluePara}</p>

                    <div className="mt-6">
                      <button
                        className="!font-sans inline-block bg-white text-blue-400 rounded-full px-4 py-2 md:px-5 md:py-3 shadow-sm font-bold"
                        aria-label="Book demo call"
                         onClick={() => handleClick()}
                      >
                        Book Demo Call @ ₹199
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full flex justify-center items-center py-10 bg-[url(/assets/checked_bg.webp)] bg-cover bg-center bg-no-repeat bg-clip-content bg-origin-content md:min-h-screen px-10 max-[630px]:px-0">
      <div className="w-full">
        <header className="text-center px-4 md:px-0 mt-0 lg:mt-16">
          <motion.h1
            className="font-extrabold leading-[1.25] text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            style={{ willChange: "transform, opacity", backfaceVisibility: "hidden", transformStyle: "preserve-3d", perspective: 1000 }}
          >
            {headingLeftChars.map((ch, i) => {
              const delay = i * charDelayStep;
              return (
                <motion.span
                  key={`hl-${i}`}
                  className="inline-block whitespace-pre"
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: headingCharDuration, delay, ease: "linear" }}
                  style={{ display: "inline-block", willChange: "transform, opacity" }}
                >
                  {ch}
                </motion.span>
              );
            })}

            <span className="text-blue-500">
              {headingRightChars.map((ch, i) => {
                const delay = (headingLeftChars.length + i) * charDelayStep;
                return (
                  <motion.span
                    key={`hr-${i}`}
                    className="inline-block whitespace-pre"
                    initial={{ opacity: 0, y: 6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: headingCharDuration, delay, ease: "linear" }}
                    style={{ display: "inline-block", willChange: "transform, opacity" }}
                  >
                    {ch}
                  </motion.span>
                );
              })}
            </span>
          </motion.h1>

          <div className="mt-4 text-sm sm:text-xl text-gray-700 overflow-hidden">
            <motion.p aria-label={paragraph} className="inline-block">
              {chars.map((ch, i) => {
                const delay = i * charDelayStep + 0.08; 
                return (
                  <motion.span
                    key={`p-${i}`}
                    className="inline-block whitespace-pre"
                    initial={{ opacity: 0, x: 8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: charDuration, delay, ease: "linear" }}
                    style={{ display: "inline-block", willChange: "transform, opacity" }}
                  >
                    {ch}
                  </motion.span>
                );
              })}
            </motion.p>
          </div>
        </header>

        <section className="mt-10 flex gap-6 items-start justify-center px-4 md:px-0">
          <div className="my-auto hidden lg:block">
            <img src="/assets/hero_pic.png" alt="" />
          </div>

          <div className="flex items-center justify-center">
            <div className="max-w-5xl">
              <div className="relative">
                <div className="bg-[#4B8DE0] text-white rounded-l-[28px] md:rounded-l-[42px] p-8 md:p-12 shadow-md">
                  <h2 className="font-bold text-2xl md:text-3xl lg:text-5xl">
                    {blueHeadingChars.map((ch, i) => {
                      const delay = i * charDelayStep + 0.2; 
                      return (
                        <motion.span
                          key={`bh-${i}`}
                          className="inline-block whitespace-pre"
                          initial={{ opacity: 0, y: 8 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.35 }}
                          transition={{ duration: headingCharDuration, delay, ease: "linear" }}
                          style={{ display: "inline-block", willChange: "transform, opacity" }}
                        >
                          {ch}
                        </motion.span>
                      );
                    })}
                  </h2>

                  <p className="mt-4 text-sm md:text-lg max-w-4xl">
                    {blueParaChars.map((ch, i) => {
                      const delay = i * charDelayStep + 0.28;
                      return (
                        <motion.span
                          key={`bp-${i}`}
                          className="inline-block whitespace-pre"
                          initial={{ opacity: 0, x: 8 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, amount: 0.35 }}
                          transition={{ duration: charDuration, delay, ease: "linear" }}
                          style={{ display: "inline-block", willChange: "transform, opacity" }}
                        >
                          {ch}
                        </motion.span>
                      );
                    })}
                  </p>

                  <div className="mt-6">
                    <motion.button
                      className="!font-sans inline-block bg-white text-blue-400 rounded-lg px-4 py-2 md:px-5 md:py-3 shadow-sm font-bold cursor-pointer"
                      aria-label="Book demo call"
                      initial={{ y: 18, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true, amount: 0.35 }}
                      transition={{ duration: 0.36, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
                       onClick={handleClick} 
                    >
                      Book Demo Call @ ₹199
                    </motion.button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
