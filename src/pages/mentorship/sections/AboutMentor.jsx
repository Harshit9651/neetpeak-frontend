// eslint-disable-next-line no-unused-vars
import { motion, useReducedMotion } from "framer-motion";

// Usage notes:
// - Requires Tailwind CSS in your project.
// - Install framer-motion: `npm install framer-motion`
// - Import and use <AboutMentor /> in any page.
// - Replace `image` and `doodle` URLs with your own links.

const headingVariant = {
  hidden: { x: 120, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 70, damping: 12 } },
};

const charsContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.03,
    },
  },
};

const charVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { ease: "easeOut", duration: 0.32 } },
};

function AnimatedChars({ text, className = "" }) {
  return (
    <motion.span
      aria-label={text}
      role="text"
      className={`inline-block ${className}`}
      variants={charsContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
    >
      {text.split("").map((ch, i) => (
        <motion.span key={`${ch}-${i}`} className="inline-block" variants={charVariant}>
          {ch}
        </motion.span>
      ))}
    </motion.span>
  );
}

export default function AboutMentor({ mentors: propMentors }) {
  // Respect user reduced motion preference
  const shouldReduceMotion = useReducedMotion();

  const image = "/assets/mentor.jpg";
  const doodle = "/assets/bg_doodle.png";

  const defaultMentors = [
    { name: "Meet Singh", title: "Director | Tech CEO", img: image },
    { name: "Jeet Singh", title: "Director | Tech CEO", img: image },
  ];

  const mentors = propMentors && propMentors.length ? propMentors : defaultMentors;

  return (
    <section className="py-10 md:py-14 lg:py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center tracking-tight mb-8 sm:mb-10 flex justify-center items-center"
          variants={headingVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <span className="mr-2">Meet Our</span>
          <span className="text-blue-600 ml-1">Mentors</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {mentors.map((m, idx) => (
            <div key={m.name} className="relative flex justify-center">
              {/* doodle background - scale/tweak per breakpoint */}
              <img
                src={doodle}
                alt="decorative background"
                className={`absolute pointer-events-none select-none -top-6 sm:-top-8 md:-top-10 lg:-top-14 w-[280px] sm:w-[320px] md:w-[420px] lg:w-[520px] transform transition-transform duration-500 ease-out z-0 \
                  ${idx % 2 === 0 ? "-translate-x-6 sm:-translate-x-8 md:-translate-x-20" : "translate-x-6 sm:translate-x-8 md:translate-x-10"}`}
                style={{ filter: "blur(0.4px)" }}
                loading="lazy"
                aria-hidden
              />

              <motion.div
                className="relative z-10 w-full max-w-[340px] sm:max-w-[380px] md:max-w-[420px] text-center"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.45, delay: idx * 0.08 }}
                viewport={{ once: true, amount: 0.5 }}
                whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
              >
                <div className="relative inline-block">
                  {/* rotated image only on md+ to avoid cropping on small screens */}
                  <div className="rounded-2xl overflow-hidden shadow-2xl transform transition-transform duration-300 ease-out md:rotate-6 rotate-0">
                    <img
                      src={m.img}
                      alt={m.name}
                      className="w-full h-[260px] sm:h-[300px] md:h-[340px] lg:h-[380px] object-cover block"
                      loading="lazy"
                    />
                  </div>

                  {/* thin decorative rounded frame - only rotated on md+ */}
                  <div className="absolute inset-0 pointer-events-none rounded-2xl border-2 border-blue-900 transform transition-transform duration-300 ease-out md:-rotate-2 rotate-0 md:translate-x-1 md:translate-y-1"></div>
                </div>

                <div className="mt-5 sm:mt-6">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-700 leading-tight">
                    <AnimatedChars text={m.name} />
                  </h3>

                  <motion.div
                    className="inline-block mt-3 bg-blue-50 px-3 py-1 rounded-xl text-sm sm:text-sm font-medium text-blue-700"
                    initial={{ opacity: 0, y: 6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.18 + idx * 0.07 }}
                    viewport={{ once: true }}
                  >
                    {m.title}
                  </motion.div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
