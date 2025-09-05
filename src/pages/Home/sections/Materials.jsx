import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
// eslint-disable-next-line no-unused-vars
import { motion, useReducedMotion } from "framer-motion";

const cards = new Array(8).fill(0).map((_, i) => ({
  id: i + 1,
  title: "Brahmastra Test Series Printed",
  price: "₹4999",
  oldPrice: "₹9098",
  rating: "4.85",
  bookings: "762 Pre-booked",
  img: "/assets/cover_image.png",
}));

export default function Materials() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const headerVariants = {
    hidden: { x: -40, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  };

  const subtitle = "Choose how you want to learn:";
  const chars = Array.from(subtitle);
  const baseParaDelay = 0.12;
  const charDelayStep = 0.018; 

  const cardVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.36, delay: 0.18 + i * 0.06, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  const controlVariants = {
    hidden: { y: 24, opacity: 0 },
    visible: (i = 0) => ({ y: 0, opacity: 1, transition: { duration: 0.36, delay: 0.18 + i * 0.06 } }),
  };

  return (
    <section className="w-full px-4 sm:px-6 lg:px-16 py-16">
      <div className="max-w-7xl mx-auto text-center">
        {}
        {!shouldReduceMotion ? (
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold tracking-tight"
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
            <span className="mr-4">Our Study Materials -</span>
            <span className="text-[#4fa3ff]"> Your Way</span>
          </motion.h2>
        ) : (
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            <span className="mr-4">Our Study Materials -</span>
            <span className="text-[#4fa3ff]"> Your Way</span>
          </h2>
        )}

        {}
        <p className="mt-6 text-sm sm:text-xl text-gray-700 font-semibold">
          {!shouldReduceMotion ? (
            <motion.span initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.35 }}>
              {chars.map((ch, i) => (
                <motion.span
                  key={`${ch}-${i}`}
                  className="inline-block whitespace-pre"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.18, delay: baseParaDelay + i * charDelayStep, ease: "linear" }}
                  style={{ display: "inline-block", willChange: "opacity" }}
                >
                  {ch}
                </motion.span>
              ))}
            </motion.span>
          ) : (
            subtitle
          )}
        </p>

        <div className="mt-10 relative rounded-[34px] border-2 border-[#cfe6ff] p-8">
          {}
          {!shouldReduceMotion ? (
            <>
              <motion.button
                ref={prevRef}
                className="absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#e6f5ff] flex items-center justify-center shadow-lg z-20 cursor-pointer"
                aria-label="previous"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.35 }}
                variants={controlVariants}
                custom={0}
                style={{ willChange: "transform, opacity" }}
              >
                <FaArrowLeftLong />
              </motion.button>

              <motion.button
                ref={nextRef}
                className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#e6f5ff] flex items-center justify-center shadow-lg z-20 cursor-pointer"
                aria-label="next"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.35 }}
                variants={controlVariants}
                custom={1}
                style={{ willChange: "transform, opacity" }}
              >
                <FaArrowRightLong />
              </motion.button>
            </>
          ) : (
            <>
              <button
                ref={prevRef}
                className="absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#e6f5ff] flex items-center justify-center shadow-lg z-20 cursor-pointer"
                aria-label="previous"
              >
                <FaArrowLeftLong />
              </button>

              <button
                ref={nextRef}
                className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#e6f5ff] flex items-center justify-center shadow-lg z-20 cursor-pointer"
                aria-label="next"
              >
                <FaArrowRightLong />
              </button>
            </>
          )}

          <Swiper
            modules={[Navigation]}
            spaceBetween={12}
            slidesPerView={1}
            onBeforeInit={(swiper) => {

              swiper.params.navigation.prevEl = prevRef.current;

              swiper.params.navigation.nextEl = nextRef.current;
            }}
            navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
            breakpoints={{
              480: { slidesPerView: 1.2 },
              640: { slidesPerView: 2 },
              900: { slidesPerView: 3 },
              1200: { slidesPerView: 4 },
              1600: { slidesPerView: 5 },
            }}
          >
            {cards.map((c, idx) => (
              <SwiperSlide key={c.id} className="!flex !justify-center">
                {!shouldReduceMotion ? (
                  <motion.article
                    className="w-64 bg-white rounded-xl shadow-md overflow-hidden"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.35 }}
                    variants={cardVariants}
                    custom={idx}
                    style={{ willChange: "transform, opacity" }}
                  >
                    <div className="relative h-44 bg-[#C4E1FF] flex items-center justify-center">
                      <img src={c.img} alt={c.title} className="h-36 object-contain transform -rotate-6" />
                      <span className="absolute top-3 left-3 bg-[#d8f3ff] text-xs px-2 py-1 rounded-md">Bestseller</span>
                    </div>
                    <div className="p-4 text-left">
                      <h3 className="font-bold text-sm leading-snug">{c.title}</h3>
                      <div className="mt-2 text-[13px] text-gray-500">NEET 2026 · {c.bookings}</div>

                      <div className="mt-3 flex items-end justify-between">
                        <div>
                          <div className="text-lg font-extrabold">{c.price}</div>
                          <div className="text-xs line-through text-gray-300">{c.oldPrice}</div>
                        </div>
                        <button className="px-3 py-1 rounded-lg bg-[#d8f3ff] text-sm font-medium">Know More</button>
                      </div>
                    </div>
                  </motion.article>
                ) : (
                  <article className="w-64 bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="relative h-44 bg-[#C4E1FF] flex items-center justify-center">
                      <img src={c.img} alt={c.title} className="h-36 object-contain transform -rotate-6" />
                      <span className="absolute top-3 left-3 bg-[#d8f3ff] text-xs px-2 py-1 rounded-md">Bestseller</span>
                    </div>
                    <div className="p-4 text-left">
                      <h3 className="font-bold text-sm leading-snug">{c.title}</h3>
                      <div className="mt-2 text-[13px] text-gray-500">NEET 2026 · {c.bookings}</div>

                      <div className="mt-3 flex items-end justify-between">
                        <div>
                          <div className="text-lg font-extrabold">{c.price}</div>
                          <div className="text-xs line-through text-gray-300">{c.oldPrice}</div>
                        </div>
                        <button className="px-3 py-1 rounded-lg bg-[#d8f3ff] text-sm font-medium">Know More</button>
                      </div>
                    </div>
                  </article>
                )}
              </SwiperSlide>
            ))}
          </Swiper>

          {}
          <div className="mt-8 flex justify-center">
            {!shouldReduceMotion ? (
              <motion.button
                className="inline-flex items-center gap-2 rounded-xl px-3 py-2 max-sm:text-sm sm:px-6 sm:py-3 font-extrabold text-white
                            bg-gradient-to-t from-[#39538D] via-[#3B5A94] to-[#4FA2D5] cursor-pointer
                            hover:brightness-110
                            transition"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.35 }}
                variants={controlVariants}
                custom={2}
                style={{ willChange: "transform, opacity" }}
              >
                Start Learning
              </motion.button>
            ) : (
              <button className="inline-flex items-center gap-2 rounded-xl px-3 py-2 max-sm:text-sm sm:px-6 sm:py-3 font-extrabold text-white
                            bg-gradient-to-t from-[#39538D] via-[#3B5A94] to-[#4FA2D5] cursor-pointer
                            hover:brightness-110
                            transition">
                Start Learning
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}