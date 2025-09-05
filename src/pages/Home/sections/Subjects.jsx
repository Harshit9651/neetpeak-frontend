// eslint-disable-next-line no-unused-vars
import { motion, useReducedMotion } from "framer-motion";

function Subjects() {
  const shouldReduceMotion = useReducedMotion();

  const subjects = [
    { assets: "/assets/biology.gif", label: "Biology" },
    { assets: "/assets/physics.gif", label: "Physics" },
    { assets: "/assets/chemistry.gif", label: "Chemistry" },
  ];

  const headerVariants = {
    hidden: { x: -40, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  };

  const paragraph = "Complete NCERT coverage with detailed explanations for every concept";
  const paraChars = Array.from(paragraph);
  const baseParaDelay = 0.18; 
  const charDelayStep = 0.02; 

  return (
    <section className="px-4 sm:px-6 lg:px-8 pb-10 md:pb-20">
      <header className="max-w-4xl mx-auto text-center">
        <motion.h1
          className="font-extrabold leading-tight text-gray-900 text-balance text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
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
          A <span className="text-[#4B8DE0]">NEET PREPARATION</span> APP FOR
        </motion.h1>

        <p className="mt-3 sm:mt-4 text-gray-700 text-pretty font-semibold text-base sm:text-lg md:text-xl">
          <motion.span
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            style={{ display: "inline" }}
          >
            {paraChars.map((ch, i) => {
              const delay = baseParaDelay + i * charDelayStep;

              if (shouldReduceMotion) {
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
        </p>
      </header>

      <div
        className="
          mt-10 md:mt-16 grid gap-10 sm:gap-12 md:gap-14
          grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
          max-w-6xl mx-auto
        "
      >
        {subjects.map((item, idx) => {
          const titleDelay = 0.3 + idx * 0.08; 

          return (
            <article
              key={item.label}
              className="
                group flex flex-col items-center text-center
                rounded-2xl p-4 sm:p-5
                transition-transform duration-300 motion-safe:hover:-translate-y-1
              "
              aria-label={item.label}
            >
              <div
                className="
                  w-full max-w-[320px] aspect-[4/3]
                  rounded-xl overflow-hidden
                  mx-auto
                "
              >
                <img
                  src={item.assets}
                  alt={`${item.label} illustration`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-contain"
                  width={640}
                  height={480}
                  sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 90vw"
                />
              </div>

              {!shouldReduceMotion ? (
                <motion.h2
                  className="mt-4 sm:mt-6 font-extrabold text-[#4B8DE0] text-2xl sm:text-2xl md:text-3xl"
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.36, delay: titleDelay, ease: [0.22, 1, 0.36, 1] }}
                  style={{ willChange: "transform, opacity" }}
                >
                  {item.label}
                </motion.h2>
              ) : (
                <h2 className="mt-4 sm:mt-6 font-extrabold text-[#4B8DE0] text-2xl sm:text-2xl md:text-3xl">
                  {item.label}
                </h2>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default Subjects;
