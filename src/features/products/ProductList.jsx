import { useParams } from "react-router-dom";

import { useProducts } from "./useProducts";

import ProductSkeleton from "../products/ProductSkeleton";
import ProductItem from "./ProductItem";
import Spinner from "../../ui/Spinner";

function ProductList() {
  const { category } = useParams();
  const {
    products,
    isLoading,
    loadMore,
    hasMore: totalProduct,
    isFetchingMore,
    error,
  } = useProducts({ category });

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <div className="min-h-screen">
        <div className="mt-3 grid grid-cols-4 gap-6">
          {/* render trc 8 cái skeleton */}
          {isLoading && products.length === 0
            ? Array.from({ length: 8 }).map((_, i) => (
                <ProductSkeleton key={i} />
              ))
            : products.map((product) => (
                <ProductItem key={product.id} product={product} />
              ))}
        </div>
        <div className="mt-8 flex justify-center">
          {products.length >= totalProduct && products.length > 0 ? (
            <span className="font-semibold text-xl">Đã xem hết sản phẩm</span>
          ) : (
            <button
              onClick={loadMore}
              disabled={isFetchingMore || isLoading}
              className="..."
            >
              {isFetchingMore ? <Spinner /> : "Xem thêm"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductList;
