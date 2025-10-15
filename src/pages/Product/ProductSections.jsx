import { useState, useEffect } from "react";
import { useProductApi } from "../../Services/product.api";
import { useCart } from "../../context/cartContext"; 
import { useNavigate } from "react-router-dom";



function Card({ product }) {
  const { addToCart, loading } = useCart(); 
  const navigate = useNavigate();

  const price = Number(product.price);       
  const oldPrice = Number(product.mrp); 

  const discount = oldPrice && price
    ? Math.round(((oldPrice - price) / oldPrice) * 100)
    : 0;

  return (
    <article className="flex-shrink-0 w-[360px] h-[500px] bg-white rounded-2xl shadow-lg flex flex-col overflow-hidden transition-transform hover:scale-105 hover:shadow-2xl">
      {/* Image */}
      <div className="relative h-52 flex items-center justify-center bg-[#f0f9ff] overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.title}
          className="h-44 object-contain transition-transform duration-500 hover:scale-110"
        />
        <span className="absolute top-3 left-3 bg-yellow-400 text-xs px-2 py-1 rounded-full font-bold shadow">
          Bestseller
        </span>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1 space-y-3">
        {/* Title */}
        <h3 className="font-bold text-lg text-blue-600">{product.title}</h3>

        {/* Description */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-1">Description:</h4>
          <p className="text-sm text-gray-600 line-clamp-3">
            {product.description || "No description available"}
          </p>
        </div>

        {/* Pricing */}
        <div className="mt-auto border-t pt-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-1">Price Details:</h4>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-green-600">₹{price}</span>
            {oldPrice && (
              <span className="text-sm line-through text-gray-400">
                ₹{oldPrice}
              </span>
            )}
          </div>
          {oldPrice && (
            <span className="text-xs text-green-600 font-semibold">
              Save ₹{oldPrice - price} ({discount}% OFF)
            </span>
          )}
        </div>

        {/* CTA */}
        <button
          onClick={() => navigate(`/productDetail/${product._id}`)}
          disabled={loading}
          className="w-full mt-3 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-semibold hover:brightness-110 transition disabled:opacity-50"
        >
          {loading ? "Adding..." : "view details"}
        </button>
      </div>
    </article>
  );
}


function CarouselSection({ title, products }) {
  return (
    <div className="mb-20">
      <h2 className="text-3xl font-bold mb-6 text-center">{title}</h2>

      <div className="overflow-x-auto scroll-smooth no-scrollbar py-2">
        <div className="flex gap-6 px-4">
          {products.map((product) => (
            <Card key={product._id} product={product} />
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


export default function ProductSections() {
  const [books, setBooks] = useState([]);
  const [onlineProducts, setOnlineProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await useProductApi.getProducts();
  
      if (data.success) {
        setBooks(data.books);
        setOnlineProducts(data.onlineProducts);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 xl:px-16 py-20 max-w-[1400px] mx-auto">
      <CarouselSection title="Hard Copy Materials" products={books} />
      <CarouselSection title="Digital Products" products={onlineProducts} />
    </section>
  );
}
