// src/pages/AboutUs.jsx
import { motion, useReducedMotion } from "framer-motion";


export default function AboutUs() {
  const shouldReduceMotion = useReducedMotion();

  // 🔠 Letter by Letter Animation
  function AnimatedText({ text, startDelay = 0 }) {
    const charDelayStep = 0.02;
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

  // 🟦 Animation Variants
  const headerVariants = {
    hidden: { x: -40, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  // 🔹 About Us Content
  const introPart1 = "Welcome to Neet Peak, your trusted companion in the journey of";
  const introPart2 = " cracking NEET with confidence and clarity.";
  const features = [
    {
      img: "/assets/biology.gif",
      title: "Complete Subject Coverage",
      desc: "Biology, Physics, and Chemistry explained in detail with NCERT-based concepts, smart notes, and animations.",
    },
    {
      img: "/assets/test_1.png",
      title: "Test Series & Mock Exams",
      desc: "Boost your confidence with chapter-wise, subject-wise, and full-length mock tests designed as per NEET standards.",
    },
    {
      img: "/assets/cover_image.png",
      title: "Expert-Curated Books",
      desc: "Get access to handpicked books that simplify complex concepts and enhance your problem-solving skills.",
    },
    {
      img: "/assets/sketch.png",
      title: "Smart Learning App",
      desc: "Track your progress, practice quizzes, analyze weaknesses, and study anytime with our mobile-friendly app.",
    },
    {
      img: "/assets/recall.png",
      title: "AI-Powered Guidance",
      desc: "Receive personalized recommendations, topic suggestions, and study plans tailored to your performance.",
    },
    {
      img: "/assets/community.jpg",
      title: "Student Community",
      desc: "Be part of a growing network of NEET aspirants, discuss doubts, and learn together with peer support.",
    },
  ];

  return (
<section
  className="px-6 sm:px-10 lg:px-16 py-16 md:py-24
  bg-[url(/assets/checked_bg.webp)] bg-repeat-y bg-center bg-[length:100%_600px]"
>


      {/* HEADER */}
      <motion.h1
        className="font-extrabold leading-tight text-gray-900 text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        variants={headerVariants}
      >
        About <span className="text-[#4B8DE0]">Neet Peak</span>
      </motion.h1>

      {/* INTRO */}
      <p className="mt-6 text-center text-gray-700 font-semibold text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto">
        <AnimatedText text={introPart1} startDelay={0.2} />
        <br />
        <AnimatedText text={introPart2} startDelay={introPart1.length * 0.02 + 0.3} />
      </p>

      {/* FEATURES GRID */}
      <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {features.map((item, idx) => {
          const delay = 0.2 + idx * 0.1;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.5, delay }}
              className="flex flex-col items-center text-center bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-32 h-32 object-contain mb-4"
              />
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#4B8DE0] mb-2">
                {item.title}
              </h2>
              <p className="text-gray-700 font-medium">{item.desc}</p>
            </motion.div>
          );
        })}
      </div>

      {/* 📱 APP SHOWCASE SECTION */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
        {/* LEFT - Mobile Demo */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <div className="relative w-[280px] h-[560px] bg-black rounded-[3rem] p-3 shadow-2xl">
            <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
              <img
                src="/assets/mobile.webp"
                alt="App Demo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-32 h-5 bg-black rounded-full"></div>
          </div>
        </motion.div>

        {/* RIGHT - Description */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="space-y-5"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Learn Anytime, Anywhere
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Our mobile app keeps learning at your fingertips. 
            Whether you’re at home, commuting, or on a break, 
            you can always stay on top of your NEET preparation.
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-[#4B8DE0] text-lg font-bold">✔</span>
              <p>Interactive video lectures with progress tracking</p>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#4B8DE0] text-lg font-bold">✔</span>
              <p>Practice tests & AI-powered analytics</p>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#4B8DE0] text-lg font-bold">✔</span>
              <p>Offline access for uninterrupted learning</p>
            </li>
          </ul>
        </motion.div>
      </div>

      {/* VISION SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.7 }}
        className="mt-20 max-w-5xl mx-auto text-center"
      >
        <h2 className="font-extrabold text-2xl sm:text-3xl md:text-4xl mb-6 text-gray-900">
          Our <span className="text-[#4B8DE0]">Vision</span>
        </h2>
        <p className="text-gray-700 font-semibold text-lg sm:text-xl leading-relaxed">
          At <span className="text-[#4B8DE0]">Neet Peak</span>, we dream of making NEET preparation 
          accessible, smart, and stress-free for every student.  
          With modern technology, AI-powered insights, and expert-curated study resources,  
          our mission is to <strong>help you reach your peak potential</strong> and secure your medical career.
        </p>
      </motion.div>

      {/* EXTRA CTA */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.6 }}
        className="mt-16 text-center"
      >
        <a
          href="/signup"
          className="inline-block bg-gradient-to-t from-[#39538D] via-[#3B5A94] to-[#4FA2D5] text-white font-extrabold px-8 py-3 rounded-2xl shadow-lg hover:brightness-110"
        >
          Start Your Journey
        </a>
      </motion.div>
    </section>
  );
}
