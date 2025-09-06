import { useState } from "react";

// Sample data
const hardCopy = [
  { id: 1, title: "Brahmastra Test Series Printed", price: "₹4999", oldPrice: "₹9098", img: "/assets/cover_image.png" },
  { id: 2, title: "Brahmastra Test Series Printed Advanced Edition", price: "₹4999", oldPrice: "₹9098", img: "/assets/cover_image.png" },
  { id: 3, title: "Physics Crash Course Book - Long Title Example", price: "₹2999", oldPrice: "₹4999", img: "/assets/cover_image.png" },
  { id: 4, title: "Chemistry Master Guide", price: "₹3999", oldPrice: "₹6999", img: "/assets/cover_image.png" },
];

const digitalCopy = [
  { id: 1, title: "Brahmastra Digital Pack", price: "₹1999", oldPrice: "₹3999", img: "/assets/cover_image.png" },
  { id: 2, title: "Mock Test Digital Access", price: "₹999", oldPrice: "₹1999", img: "/assets/cover_image.png" },
  { id: 3, title: "Online Physics Masterclass", price: "₹2499", oldPrice: "₹4499", img: "/assets/cover_image.png" },
  { id: 4, title: "Biology Video Lectures", price: "₹2199", oldPrice: "₹3999", img: "/assets/cover_image.png" },
];

// Card Component
function Card({ product }) {
  const discount = Math.round(((parseInt(product.oldPrice.slice(1)) - parseInt(product.price.slice(1))) / parseInt(product.oldPrice.slice(1))) * 100);

  return (
    <article className="flex-shrink-0 w-80 h-[400px] bg-white rounded-2xl shadow-lg flex flex-col overflow-hidden transition-transform hover:scale-105 hover:shadow-2xl">
      {/* Image */}
      <div className="relative h-48 flex items-center justify-center bg-[#dbeafe] overflow-hidden">
        <img src={product.img} alt={product.title} className="h-40 object-contain transition-transform duration-500 hover:scale-110" />
        <span className="absolute top-3 left-3 bg-yellow-400 text-xs px-2 py-1 rounded-full font-bold shadow">Bestseller</span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-sm mb-1 line-clamp-2">{product.title}</h3>
        <div className="mt-2 text-sm text-gray-500">NEET 2026</div>

        <div className="mt-auto flex items-end justify-between pt-4">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-black">{product.price}</span>
              <span className="text-sm line-through text-gray-400">{product.oldPrice}</span>
            </div>
            <span className="text-xs text-green-600 font-semibold">Save ₹{parseInt(product.oldPrice.slice(1)) - parseInt(product.price.slice(1))}</span>
          </div>
          <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-semibold hover:brightness-110 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}

// Carousel Section
function CarouselSection({ title, products }) {
  return (
    <div className="mb-20">
      <h2 className="text-3xl font-bold mb-6 text-center">{title}</h2>
      
      {/* Horizontal scroll container with no scrollbar */}
      <div className="overflow-x-auto scroll-smooth no-scrollbar py-2">
        <div className="flex gap-6 px-4">
          {products.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

// Main Component
export default function ProductSections() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 xl:px-16 py-20 max-w-[1400px] mx-auto">
      {/* Hard Copy Section */}
      <CarouselSection title="Hard Copy Materials" products={hardCopy} />

      {/* Digital Copy Section */}
      <CarouselSection title="Digital Products" products={digitalCopy} />
    </section>
  );
}
