import ProductItem from "./ProductItem";
import { useProducts } from "./useProducts";
import Spinner from "../../ui/Spinner";

function ProductList() {
  const { products, isLoading, error } = useProducts();

  if (isLoading) return <Spinner />;
  if (error) return <p>Có lỗi khi tải</p>;

  return (
    <div className="mt-3 grid grid-cols-4 gap-6">
      {/* LIST PRODUCT */}
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;
