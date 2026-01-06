import { useEffect, useState } from "react";

import { GrPowerReset } from "react-icons/gr";

import { RemoveRecentView } from "../features/products/RemoveRecentView";

import ProductList from "../features/products/ProductList";
import Heading from "../ui/Heading";
import SearchBar from "../features/products/SearchBar";
import RecentView from "../features/products/RecentView";

function Product() {
  // Sp đã xem
  const [recentProducts, setRecentProducts] = useState([]);

  // Hàm xóa tất cả sp đã xem
  const handleClearAll = () => {
    RemoveRecentView(null, setRecentProducts, true);
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("recent_views")) || [];
    setRecentProducts(data);
  }, []);

  return (
    <div className="box-content mx-auto max-w-300 px-6">
      {recentProducts.length !== 0 ? (
        <div>
          <div className="flex items-center justify-between">
            <p className=" mb-3 text-3xl font-bold mt-4">Sản phẩm đã xem</p>
            <p
              className="cursor-pointer text-gray-400"
              onClick={handleClearAll}
            >
              Xóa tất cả
            </p>
          </div>
          <RecentView
            recent_product={recentProducts}
            onRemove={(id) => RemoveRecentView(id, setRecentProducts, false)}
          />
        </div>
      ) : (
        ""
      )}
      <Heading>Game trên Steam</Heading>
      <SearchBar />

      {/* CONTENT */}
      <ProductList />
    </div>
  );
}

export default Product;
