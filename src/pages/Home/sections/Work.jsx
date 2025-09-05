// eslint-disable-next-line no-unused-vars
import { motion, useReducedMotion } from "framer-motion";

export default function Work() {
  const shouldReduceMotion = useReducedMotion();

  const cards = [
    {
      title: "Line-by-Line NCERT MCQs",
      desc: "Peak-Style questions crafted from every line of NCERT textbooks",
      icon: <img src="/assets/line_by_line.png" alt="Line by line" />,
    },
    {
      title: "Page-Wise Test Generation",
      desc: "Create custom tests from specific pages and concepts",
      icon: <img src="/assets/page_wise.png" alt="Page wise" />,
    },
    {
      title: "Peak Recall System",
      desc: "7-Step revision routine for maximum retention",
      icon: <img src="/assets/recall.png" alt="Recall system" />,
    },
    {
      title: "Engaging Learning Tools",
      desc: "Flashcards, quizzes, memes, and podcasts for fun learning",
      icon: <img src="/assets/engaging.png" alt="Engaging tools" />,
    },
  ];

  const headerVariants = {
    hidden: { x: -40, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  };

  const paragraph = "Innovative features designed to accelerate your NEET preparation journey";
  const paraChars = Array.from(paragraph);
  const baseParaDelay = 0.16;
  const charDelayStep = 0.02;

  return (
    <section className="w-full pt-12 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <div className="px-4 sm:px-6 lg:px-8 text-center">
          {!shouldReduceMotion ? (
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4"
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
              <span className="text-black">Why</span>{" "}
              <span className="text-[#4aa3ff]">Neet</span>{" "}
              <span className="text-[#4aa3ff]">Peak</span>{" "}
              <span className="text-black">Works</span>
            </motion.h2>
          ) : (
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
              <span className="text-black">Why</span>{" "}
              <span className="text-[#4aa3ff]">Neet</span>{" "}
              <span className="text-[#4aa3ff]">Peak</span>{" "}
              <span className="text-black">Works</span>
            </h2>
          )}

          <p className="text-gray-600 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 sm:mb-12">
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
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
          {cards.map((c, i) => {
            const itemDelay = 0.28 + i * 0.06; 
            return (
              <motion.article
                key={i}
                className="relative bg-white rounded-2xl p-8 text-left shadow-2xl transition-all duration-500 ease-in-out transform hover:-translate-y-2 cursor-pointer"
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 8 }}
                whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={shouldReduceMotion ? {} : { duration: 0.36, delay: itemDelay, ease: [0.22, 1, 0.36, 1] }}
                style={shouldReduceMotion ? {} : { willChange: "transform, opacity" }}
                aria-label={c.title}
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#f4f9ff] mb-4 text-[#2d8bff] mx-auto">
                  {c.icon}
                </div>

                <h3 className="text-lg font-semibold text-center mb-2 tracking-tight">{c.title}</h3>
                <p className="text-sm text-gray-600 text-center">{c.desc}</p>

                <div className="pointer-events-none absolute inset-0 rounded-2xl" aria-hidden />
              </motion.article>
            );
          })}
        </div>
      </div>

      <img src="/assets/sketch.png" className="w-40 -mt-20 mr-4 ml-auto" alt="" />
    </section>
  );
}
