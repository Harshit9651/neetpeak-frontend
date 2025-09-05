import React, { useRef, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, useReducedMotion } from "framer-motion";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

/* Timing controls — tweak to taste */
const CARD_SLIDE_X = -150; // container slide distance (px)
const CARD_SLIDE_DUR = 0.5; // container slide duration (s)

const LINE_STAGGER = 0.08; // delay between lines (top -> bottom)
const CHAR_STEP = 0.012; // delay between characters within a line (left -> right)
const CHAR_DUR = 0.12; // character fade duration

export default function WaveCardMentors() {
  const cards = [
    {
      id: 1,
      icon: "/assets/test_1.png",
      title: "3-Month Intensive Plan",
      price: "₹1,499",
      originalPrice: "₹2,999",
      bullets: [
        "Personal mentor assignment",
        "Weekly 1-on-1 sessions",
        "Study plan customization",
        "Doubt clearing sessions",
        "Performance tracking & analysis",
      ],
    },
    {
      id: 2,
      icon: "/assets/test_2.png",
      title: "6-Month Complete Plan",
      price: "₹2,999",
      originalPrice: "₹4,999",
      isPopular: true,
      bullets: [
        "All features of 3-Month Plan",
        "24/7 doubt resolution via WhatsApp",
        "Stress management guidance",
        "Parent-mentor sessions",
        "Priority support",
      ],
    },
  ];

  const containerRef = useRef(null);
  const cardRefs = useRef(cards.map(() => React.createRef()));

  useEffect(() => {
    if (cardRefs.current.length !== cards.length) {
      cardRefs.current = cards.map(() => React.createRef());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards.length]);

  const scrollToIndex = (idx) => {
    const ref = cardRefs.current[idx];
    if (ref && ref.current && containerRef.current) {
      const cardEl = ref.current;
      const containerEl = containerRef.current;
      const containerRect = containerEl.getBoundingClientRect();
      const cardRect = cardEl.getBoundingClientRect();
      const offset =
        cardRect.left -
        containerRect.left -
        (containerRect.width / 2 - cardRect.width / 2);
      containerEl.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (cardRefs.current[0] && cardRefs.current[0].current) {
        scrollToIndex(0);
      }
    }, 50);
  }, []);

  return (
    <div className="w-full flex justify-center py-8 px-4 mt-4 relative">
      <div className="w-full max-w-[1000px]">
        <div
          ref={containerRef}
          className="flex gap-6 overflow-x-auto overflow-y-visible no-scrollbar pt-16 pb-2 px-2"
          style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
        >
          <div
            className="flex flex-nowrap gap-6 justify-between items-stretch w-full"
            style={{ minWidth: "100%" }}
          >
            {cards.map((c, idx) => (
              <div
                key={c.id}
                ref={cardRefs.current[idx]}
                className="flex-1 min-w-[260px] max-w-[21rem] basis-[44%] snap-center"
                style={{ flexBasis: "44%" }}
              >
                <RevealCard data={c} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile prev/next */}
      <div className="absolute left-2 bottom-1/2 sm:hidden z-40">
        <button
          onClick={() => scrollToIndex(0)}
          aria-label="Prev"
          className="bg-white/90 shadow-md rounded-full p-2 hover:bg-white transition"
        >
          <svg
            className="w-5 h-5 text-gray-700"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
          >
            <path
              d="M15 6L9 12L15 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <div className="absolute right-2 bottom-1/2 sm:hidden z-40">
        <button
          onClick={() => scrollToIndex(1)}
          aria-label="Next"
          className="bg-white/90 shadow-md rounded-full p-2 hover:bg-white transition"
        >
          <svg
            className="w-5 h-5 text-gray-700"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
          >
            <path
              d="M9 6L15 12L9 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

function RevealCard({ data }) {
  const shouldReduceMotion = useReducedMotion();

  const articleVariants = {
    hidden: { opacity: 0, x: CARD_SLIDE_X },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: CARD_SLIDE_DUR, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const contentVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: LINE_STAGGER } },
  };
  const lineVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: CHAR_STEP } },
  };

  const charVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: CHAR_DUR, ease: "linear" },
    },
  };

  function Line({ text = "", bold = false, as = "div" }) {
    if (shouldReduceMotion) {
      const Tag = as;
      return <Tag className={bold ? "font-extrabold" : ""}>{text}</Tag>;
    }

    return (
      <motion.div
        variants={lineVariants}
        className="inline-block break-words"
        style={{ whiteSpace: "pre-wrap" }}
      >
        {Array.from(text).map((ch, i) => (
          <motion.span
            key={`${text}-${i}`}
            variants={charVariants}
            className={`${bold ? "font-extrabold" : ""} inline-block leading-tight}`}
            style={{ display: "inline-block", willChange: "opacity" }}
          >
            {ch === " " ? "\u00A0" : ch}
          </motion.span>
        ))}
      </motion.div>
    );
  }

  return (
    <motion.article
      className="relative bg-[#C2E2FF] p-8 pt-12 shadow-[10px_10px_0_rgba(59,130,246,1)] flex flex-col h-full overflow-visible"
      style={{ minHeight: 140 }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
      variants={articleVariants}
    >
      {/* Decorative doodle */}
      <div className="absolute left-1/2 -translate-x-1/2 -top-10 z-10 pointer-events-none">
        <img src="/assets/doodle.svg" className="h-14 relative" alt="" />
      </div>

      {/* MOST POPULAR badge */}
       {data.isPopular && (
          <div className="absolute -top-12 -left-15 z-20 pointer-events-none w-30 max-[800px]:w-20 max-[800px]:-top-4 max-[800px]:-left-4">
            <img
              src="/assets/popular_badge.png"
              alt="Most Popular Badge"
              className="w-full h-auto"
            />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-bold text-sm max-[800px]:text-xs text-center">
              Most Popular
            </span>
          </div>
        )}


      <motion.div variants={contentVariants} className="flex flex-col gap-2">
        <h3 className="text-base md:text-lg font-extrabold text-slate-800 mb-0 leading-snug text-center">
          <Line text={data.title} />
        </h3>

        <div className="flex items-baseline gap-3 mb-2 mt-1 mx-auto">
          <span className="text-2xl md:text-3xl font-extrabold text-slate-900">
            {data.price}
          </span>
          <span className="text-sm text-gray-600 line-through">
            {data.originalPrice}
          </span>
        </div>

        <ul className="space-y-1 mb-3">
          {data.bullets.map((b, i) => (
            <motion.li
              key={i}
              className="flex items-start gap-3"
              variants={lineVariants}
            >
              <motion.span
                className="mt-0.5 p-0.5 rounded-sm bg-green-400 text-white inline-flex items-center justify-center"
                variants={charVariants}
                aria-hidden
                style={{ minWidth: 20, height: 20, fontSize: 10 }}
              >
                ✔
              </motion.span>

              <div className="flex-1 text-xs font-bold">
                <Line text={b} />
              </div>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      <div className="mt-auto flex justify-center">
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-xl px-6 py-3 max-sm:text-sm font-extrabold text-white
                        bg-gradient-to-t from-[#39538D] via-[#4968a3] to-[#57a1d3] cursor-pointer
                        hover:brightness-110
                        transition"
        >
          Enroll Now
        </button>
      </div>
    </motion.article>
  );
}