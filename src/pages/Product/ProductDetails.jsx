import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useProductApi } from "../../Services/product.api";
import { useCart } from "../../context/cartContext";
import { useAuth } from "../../context/authContext";
import { Loader2, ShoppingCart } from "lucide-react";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const { addToCart, loading: cartLoading } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [showFullDesc, setShowFullDesc] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await useProductApi.getProductbyId(id);
        if (res.success) {
          setProduct(res.data);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="animate-spin w-10 h-10 text-blue-500" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-10 text-gray-500">
        Product not found.
      </div>
    );
  }

  const price = Number(product.price);
  const oldPrice = Number(product.mrp);
  const discount = oldPrice
    ? Math.round(((oldPrice - price) / oldPrice) * 100)
    : 0;

  const handleAddToCart = async () => {
    if (!user?.id) {
      navigate("/signin");
      return;
    }
    await addToCart(product);
  };

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Image Box - fixed height */}
        <div className="flex justify-center items-center bg-gray-50 rounded-2xl shadow-md p-6 h-[400px]">
          <img
            src={product.images?.[0]}
            alt={product.title}
            className="h-full object-contain hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col space-y-6">
          <h1 className="text-3xl font-bold text-gray-800">
            {product.title}
          </h1>

          {/* Description with Read More */}
          <div>
            <p
              className={`text-gray-600 text-base leading-relaxed whitespace-pre-line break-words ${
                showFullDesc ? "" : "line-clamp-4"
              }`}
            >
              {product.description || "No description available"}
            </p>
            {product.description?.length > 200 && (
              <button
                onClick={() => setShowFullDesc(!showFullDesc)}
                className="text-blue-500 font-semibold mt-2 hover:underline"
              >
                {showFullDesc ? "Read Less" : "Read More"}
              </button>
            )}
          </div>

          {/* Pricing */}
          <div className="border-t border-b py-4 flex items-center gap-4">
            <span className="text-3xl font-extrabold text-green-600">
              ₹{price}
            </span>
            {oldPrice > 0 && (
              <>
                <span className="text-lg line-through text-gray-400">
                  ₹{oldPrice}
                </span>
                <span className="text-sm text-red-600 font-semibold">
                  {discount}% OFF
                </span>
              </>
            )}
          </div>

          {/* CTA */}
          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              disabled={cartLoading}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-gray-300 bg-white text-gray-700 font-semibold hover:bg-gray-50 transition"
            >
              {cartLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </>
              )}
            </button>
          </div>

          {/* Highlights */}
          {/* <div>
            <h3 className="text-lg font-semibold mb-2">Highlights:</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {product.highlights?.length > 0 ? (
                product.highlights.map((point, i) => (
                  <li key={i}>{point}</li>
                ))
              ) : (
                <li>No highlights available</li>
              )}
            </ul>
          </div> */}
        </div>
      </div>
    </section>
  );
}
