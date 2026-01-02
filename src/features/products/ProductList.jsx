import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import { useProducts } from "./useProducts";
import { searchProductByKeyword } from "../../services/apiProduct";

import ProductItem from "./ProductItem";
import ProductSkeleton from "./ProductSkeleton";
import Spinner from "../../ui/Spinner";

function ProductList() {
  const { category } = useParams(); // đọc param từ route

  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("search") || "";
  const sortBy = searchParams.get("sort") || "";

  const {
    products: normalProducts,
    isLoading: isNormalLoading,
    loadMore,
    hasMore: totalProduct,
    isFetchingMore,
    error,
  } = useProducts({ category });

  // Search
  const [searchResult, setSearchResult] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (keyword || sortBy) {
      const fetchProducts = async () => {
        setIsSearching(true);
        try {
          const res = await searchProductByKeyword(keyword, sortBy);
          setSearchResult(res.data);
        } catch (err) {
          console.error("Lỗi search:", err);
        } finally {
          setIsSearching(false);
        }
      };
      fetchProducts();
    }
  }, [keyword, sortBy]);

  // if keyword dùng searchResult else dùng normalProducts

  const isFiltering = keyword || sortBy;

  const displayProducts = isFiltering ? searchResult : normalProducts;
  const showLoading = keyword
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
