import ProductItem from "./ProductItem";
import Spinner from "../../ui/Spinner";
import { useProducts } from "./useProducts";
import { useParams } from "react-router-dom";

function ProductList() {
  const { category } = useParams(); // undefined nếu không truyền cate
  const {
    products,
    isLoading,
    loadMore,
    hasMore: totalProduct,
    isFetchingMore,
    error,
  } = useProducts({
    category,
  });

  if (isLoading && products.length === 0) return <Spinner />;
  if (error) return <p>{error}</p>;
  console.log(totalProduct);

  return (
    <>
      <div className="mt-3 grid grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}

        {/* LOAD MORE BUTTON */}
      </div>
      {products.length === totalProduct ? (
        <div className="mt-4 mb-4 flex justify-center font-semibold text-xl">
          Đã xem hết sản phẩm
        </div>
      ) : (
        <div className="mt-4 mb-4 flex justify-center">
          <button
            type="button"
            onClick={() => {
              if (!isFetchingMore && !isLoading) loadMore();
            }}
            disabled={isFetchingMore}
            className="px-6 py-2 bg-blue-600 text-white rounded-md
          hover:bg-blue-700 disabled:bg-gray-400"
          >
            {isFetchingMore ? "Đang tải..." : "Xem thêm"}
          </button>
        </div>
      )}
    </>
  );
}

export default ProductList;
