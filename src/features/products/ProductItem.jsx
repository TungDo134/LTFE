import { Link, useNavigate } from "react-router-dom";

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

  return (
    <div
      className="
      overflow-hidden
      rounded-md
      border
      bg-white
      shadow-sm
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
          className="h-full w-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-2">
        <h3
          className="
          mb-1
          text-sm
          font-medium
          leading-tight
          text-gray-900
          line-clamp-2
        "
        >
          {title}
        </h3>

        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-900">
            {sale_price}đ
          </span>

          <span className="text-xs text-gray-400 line-through">
            {original_price}đ
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
      </div>
    </div>
  );
}

export default ProductItem;
