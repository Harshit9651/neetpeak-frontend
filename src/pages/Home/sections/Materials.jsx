import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { motion, useReducedMotion } from "framer-motion";
import { useProductApi } from "../../../Services/product.api";
import { useNavigate } from "react-router-dom";

export default function MaterialsSwiper() {
  const [products, setProducts] = useState([]);
  const shouldReduceMotion = useReducedMotion();
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await useProductApi.getProducts();
      if (data.success) {
        // Combine books and online products and slice first 4
        const combined = [...data.books, ...data.onlineProducts].slice(0, 4);
        setProducts(combined);
      }
    };
    fetchData();
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.36, delay: 0.18 + i * 0.06, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  const renderCard = (product, idx) => (
    <motion.article
      key={idx}
      className="w-64 bg-white rounded-xl shadow-md overflow-hidden flex-shrink-0"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
      variants={cardVariants}
      custom={idx}
    >
      <div className="relative h-44 bg-[#C4E1FF] flex items-center justify-center">
        <img
          src={product.images[0]}
          alt={product.title}
          className="h-36 object-contain transform -rotate-6"
        />
        {/* <span className="absolute top-3 left-3 bg-[#d8f3ff] text-xs px-2 py-1 rounded-md">
          {product.productType === "book" ? "Book" : "OnlineProduct"}
        </span> */}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-sm leading-snug">{product.title}</h3>
        <div className="mt-2 text-[13px] text-gray-500">{product.category || "No Category"}</div>

        <div className="mt-3 flex items-end justify-between">
          <div>
            <div className="text-lg font-extrabold">₹{product.price}</div>
            {product.mrp && <div className="text-xs line-through text-gray-300">₹{product.mrp}</div>}
          </div>
          <button
            onClick={() => navigate("/product")}
            className="px-3 py-1 rounded-lg bg-[#d8f3ff] text-sm font-medium"
          >
            Know More
          </button>
        </div>
      </div>
    </motion.article>
  );

  return (
    <section className="w-full px-4 sm:px-6 lg:px-16 py-16">
      <h2 className="text-3xl font-bold mb-6 text-center">Our Materials</h2>
      <div className="relative">
        <div ref={prevRef} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 cursor-pointer">
          <FaArrowLeftLong size={28} />
        </div>
        <div ref={nextRef} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 cursor-pointer">
          <FaArrowRightLong size={28} />
        </div>

        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
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
          }}
        >
          {products.map((p, idx) => (
            <SwiperSlide key={idx} className="flex justify-center">
              {renderCard(p, idx)}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
