import React, { useRef, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {useMentorshipApi } from "../../Services/mentorship.api"; // ✅ import API
import { useNavigate } from "react-router-dom";

/* Timing controls */
const CARD_SLIDE_X = -150;
const CARD_SLIDE_DUR = 0.5;
const LINE_STAGGER = 0.08;
const CHAR_STEP = 0.012;
const CHAR_DUR = 0.12;

export default function WaveCardMentors() {
  const [cards, setCards] = useState([]);
  const containerRef = useRef(null);
  const cardRefs = useRef([]);

  // ✅ Fetch data from backend
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await useMentorshipApi.getMentorshipPlan();
        if (res?.success && Array.isArray(res.data)) {
          setCards(res.data);
          cardRefs.current = res.data.map(() => React.createRef());
        }
      } catch (error) {
        console.error("Error fetching mentorship plans:", error);
      }
    };
    fetchPlans();
  }, []);

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

  // ✅ Auto focus first card
  useEffect(() => {
    setTimeout(() => {
      if (cardRefs.current[0] && cardRefs.current[0].current) {
        scrollToIndex(0);
      }
    }, 200);
  }, [cards]);

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
                key={c._id}
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
      {cards.length > 1 && (
        <>
          <div className="absolute left-2 bottom-1/2 sm:hidden z-40">
            <button
              onClick={() => scrollToIndex(0)}
              aria-label="Prev"
              className="bg-white/90 shadow-md rounded-full p-2 hover:bg-white transition"
            >
              ◀
            </button>
          </div>
          <div className="absolute right-2 bottom-1/2 sm:hidden z-40">
            <button
              onClick={() => scrollToIndex(1)}
              aria-label="Next"
              className="bg-white/90 shadow-md rounded-full p-2 hover:bg-white transition"
            >
              ▶
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function RevealCard({ data }) {
  const shouldReduceMotion = useReducedMotion();
    const navigate = useNavigate();

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
      {/* Badge if Active */}
      {data.isActive && (
        <div className="absolute -top-12 -left-12 z-20 pointer-events-none">
          
        </div>
      )}

      <motion.div variants={contentVariants} className="flex flex-col gap-2">
        <h3 className="text-base md:text-lg font-extrabold text-slate-800 mb-0 leading-snug text-center">
          <Line text={data.planName} />
        </h3>

        <div className="flex items-baseline gap-3 mb-2 mt-1 mx-auto">
          <span className="text-2xl md:text-3xl font-extrabold text-slate-900">
            ₹{data.price}
          </span>
          <span className="text-sm text-gray-600 line-through">₹{data.mrp}</span>
        </div>

        <ul className="space-y-1 mb-3">
          {data.features?.map((f, i) => (
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
                <Line text={f} />
              </div>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      <div className="mt-auto flex justify-center">
            <button
          type="button"
          onClick={() => navigate("/mentorship-checkout", { state: { plan: data } })}
          className="inline-flex items-center gap-2 rounded-xl px-6 py-3 max-sm:text-sm font-extrabold text-white
            bg-gradient-to-t from-[#39538D] via-[#4968a3] to-[#57a1d3] cursor-pointer
            hover:brightness-110 transition"
        >
          Enroll Now
        </button>
      </div>
    </motion.article>
  );
}
