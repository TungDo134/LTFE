import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProduct } from "./useProduct";
import { useDispatch } from "react-redux";

import { PiPackage } from "react-icons/pi";
import { LuCodeXml } from "react-icons/lu";
import { GoTag } from "react-icons/go";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { FaBell, FaHeart, FaCreditCard } from "react-icons/fa";

import { formatNumber } from "../../utils/formatNumber";
// import { addToCart } from "../../redux/cartSlice";
import { addToCartAndSync } from "../../redux/cartSlice";
import { addRecentView } from "./addRecentView";

import toast from "react-hot-toast";
import ProductInformation from "./ProductInformation";
import ProductSkeleton from "./ProductSkeleton";
import HomeCategory from "../home/HomeCategory";
import ProductReview from "./ProductReview.jsx";

function ProductDetail() {
  const { productId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { product, isLoading, error } = useProduct(productId);

  // Chức năng sp đã xem
  useEffect(() => {
    if (product && product.id) {
      addRecentView(product);
    }
  }, [product]);

  if (isLoading) return <ProductSkeleton />;

  if (error) return <p>Có lỗi khi tải</p>;

  const {
    title,
    thumbnail,
    sale_price,
    original_price,
    discount_percentage,
    metadata,
  } = product;

  // Add cart
  function handleAddToCart(e) {
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
  }

  // Mua ngay
  function handleBuyNow(e) {
    e.stopPropagation();
    dispatch(
      addToCartAndSync({
        id: productId,
        title,
        price: sale_price,
        thumbnail,
      })
    );

    navigate("/cart");
  }

  return (
    <>
      <HomeCategory />
      {/* Picture */}
      <div className="bg-white py-5">
        <div className="w-full mx-auto max-w-7xl py-2  grid grid-cols-5 gap-4 ">
          <div className="col-span-2">
            <img src={thumbnail} alt={title} className="rounded-xl" />
          </div>
          {/* Metadata */}
          <div className="col-span-3 grid gap-y-4 ">
            <p className="text-gray-500">Sản phẩm:</p>
            <h1 className="w-xl font-medium text-xl">{title}</h1>

            <div className="grid gap-y-2">
              <div className="flex items-center gap-2">
                <PiPackage />
                <p className="text-sm">
                  Tình trạng:{" "}
                  <span className="text-green-600">{metadata.status}</span>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <LuCodeXml />
                <p className="text-sm">
                  Mã sản phẩm:{" "}
                  <span className="font-medium">{metadata.sku}</span>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <GoTag />
                <p className="text-sm">
                  Thể loại:{" "}
                  <span className="font-normal">
                    {metadata.categories.join(",")}
                  </span>
                </p>
              </div>
            </div>

            {/* New Price */}
            <div className="flex gap-y-2 items-center gap-x-3 text-xl text-gray-500">
              <p className="font-semibold text-black tracking-tighter">
                {formatNumber(sale_price)}
              </p>
              <FaBell />
              <FaHeart />
            </div>

            {/* Old Price */}
            <div className="flex gap-y-2 items-center gap-x-3 text-xl text-gray-500">
              <p className="font-semibold text-gray-300 line-through tracking-tighter ">
                {formatNumber(original_price)}
              </p>
              <p className="p-2 bg-red-600 rounded-md text-sm text-white">
                {discount_percentage}%
              </p>
            </div>

            <div className="border-b border-gray-500/50 w-[60%]"></div>
            {/* Thanh toán */}
            <div className="flex gap-3 mb-8">
              <button
                onClick={handleBuyNow}
                className="flex w-[25%] items-center justify-center gap-2 bg-[#2579f2] text-white py-2  rounded-lg  hover:bg-blue-600 transition-colors"
              >
                <FaCreditCard className="text-xl" />
                <span>Mua ngay</span>
              </button>

              <button
                onClick={handleAddToCart}
                className="flex w-[25%] items-center justify-center gap-2 border border-gray-300 bg-white text-[#2579f2] py-2 rounded-lg  hover:bg-gray-50 transition-colors"
              >
                <HiOutlineShoppingCart className="text-2xl" />
                <span>Thêm vào giỏ</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <ProductInformation metadata={metadata} />
      </div>
      <div>
        <ProductReview productId={productId} />
      </div>
    </>
  );
}

export default ProductDetail;
