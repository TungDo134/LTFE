import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";

import { formatNumber } from "../../utils/formatNumber";

import { FaCartPlus } from "react-icons/fa";

import toast from "react-hot-toast";

function ProductItem({ product }) {
  const {
    id: productId,
    title,
    thumbnail,
    sale_price,
    original_price,
    discount_percentage,
  } = product;

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const handleAddToCart = (e) => {
    e.stopPropagation();

    dispatch(
      addToCart({
        id: productId,
        title,
        price: sale_price,
        thumbnail,
      })
    );
    toast.success("Đã thêm vào giỏ hàng 🛒");
  };

  return (
    <div
      className="
      overflow-hidden
      rounded-md
      transition
      hover:shadow-md
      cursor-pointer
    "
      onClick={() => navigate(`/product/${productId}`)}
    >
      {/* Image */}
      <div className="aspect-16/7 overflow-hidden bg-gray-100">
        <img
          src={thumbnail}
          alt={title}
          className="h-full w-full object-cover rounded-md shadow-md"
        />
      </div>

      {/* Content */}
      <div className="py-2.5 px-0.5">
        <h3
          className="
          mb-1
          text-md
          font-medium
          leading-tight
          text-gray-900
          line-clamp-2
        "
        >
          {title}
        </h3>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-md font-semibold text-gray-900 tracking-tighter">
              {formatNumber(sale_price)}
            </span>

            <span className="text-md text-gray-400 line-through tracking-tighter">
              {formatNumber(original_price)}
            </span>

            <span
              className="
            rounded
            bg-red-500
            px-1.5
            py-0.5
            text-xs
            font-semibold
            text-white"
            >
              -{discount_percentage}%
            </span>
          </div>

          {/* ADD TO CART */}
          <div className="text-gray-500 ">
            <button
              onClick={handleAddToCart}
              className="p-2 rounded-full hover:bg-gray-100 transition-all active:scale-95 group cursor-pointer"
            >
              <FaCartPlus className=" text-xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
