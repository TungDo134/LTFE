import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import { useProducts } from "./useProducts";
import { searchProductByKeyword } from "../../services/apiProduct";

import ProductItem from "./ProductItem";
import ProductSkeleton from "./ProductSkeleton";
import Spinner from "../../ui/Spinner";

function ProductList() {
  // query params (lấy từ url)
  const [searchParams] = useSearchParams();

  const keyword = searchParams.get("search") || "";
  const sortBy = searchParams.get("sort") || "";
  const category = searchParams.get("category") || "";

  // lấy data mặc định (không filter)
  const {
    products: normalProducts,
    isLoading: isNormalLoading,
    loadMore,
    hasMore: totalProduct,
    isFetchingMore,
    error,
  } = useProducts({ category });

  const [searchResult, setSearchResult] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Trigger khi bất kỳ tham số nào trên URL thay đổi
  useEffect(() => {
    if (keyword || sortBy || category) {
      const fetchProducts = async () => {
        setIsSearching(true);
        try {
          // Truyền cả 3 tham số vào API
          const res = await searchProductByKeyword(keyword, sortBy, category);
          setSearchResult(res.data);
        } catch (err) {
          console.error("Lỗi filter:", err);
        } finally {
          setIsSearching(false);
        }
      };
      fetchProducts();
    }
  }, [keyword, sortBy, category]);

  const isFiltering = keyword || sortBy || category;

  const displayProducts = isFiltering ? searchResult : normalProducts;

  const showLoading = isFiltering
    ? isSearching
    : isNormalLoading && normalProducts.length === 0;

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="min-h-screen">
      {keyword && (
        <p className="mb-4 text-gray-600">
          Kết quả tìm kiếm cho: <b className="text-blue-600">"{keyword}"</b>
        </p>
      )}

      <div className="mt-3 grid grid-cols-4 gap-6">
        {showLoading
          ? Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)
          : displayProducts.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
      </div>

      {!keyword && (
        <div className="mt-8 flex justify-center">
          {displayProducts.length >= totalProduct &&
          displayProducts.length > 0 ? (
            <span className="font-semibold text-xl">Đã xem hết sản phẩm</span>
          ) : (
            <button
              onClick={loadMore}
              disabled={isFetchingMore || isNormalLoading}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
            >
              {isFetchingMore ? <Spinner /> : "Xem thêm"}
            </button>
          )}
        </div>
      )}

      {keyword && !isSearching && displayProducts.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          Không tìm thấy sản phẩm nào khớp với từ khóa.
        </div>
      )}
    </div>
  );
}

export default ProductList;
