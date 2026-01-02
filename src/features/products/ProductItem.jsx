import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCartAndSync } from "../../redux/cartSlice";

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

  const dispatch = useDispatch();
  const handleAddToCart = (e) => {
    e.stopPropagation();

    dispatch(
      addToCartAndSync({
        id: productId,
        title,
        price: sale_price,
        thumbnail,
      })
    );

    toast.success("Đã thêm vào giỏ hàng 🛒");
  };

  return (
    <div className="mb-2">
      <Link to={`/product/${productId}`}>
        <img className={"rounded-lg mb-2"} src={thumbnail} />
        <div className={"text-[14px] mb-2"}>{title}</div>
      </Link>
      <div className="flex items-center">
        <span className="mr-2 text-[14px] font-bold">
          {sale_price?.toLocaleString("vi-VN")}đ
        </span>
        <span className="mr-6 text-[14px] text-gray-500/80 line-through">
          {original_price?.toLocaleString("vi-VN")}đ
        </span>
        <div className="flex items-center justify-between w-full">
          <span
            className={
              "bg-red-700 text-white rounded-lg pt-1 pb-1 pl-2 pr-2 text-[14px]"
            }
          >
            -{discount_percentage}%{/* ADD TO CART */}
          </span>
          <div className="text-gray-500 ">
            <button
              onClick={handleAddToCart}
              className="p-2 rounded-full hover:bg-gray-300 transition-all active:scale-95 group cursor-pointer"
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
