import { useProduct } from "./useProduct";
import Spinner from "../../ui/Spinner";
function ProductDetail() {
  const { product, isLoading, error } = useProduct();

  if (isLoading) return <Spinner />;
  if (error) return <p>Có lỗi khi tải</p>;

  const { title, thumbnail, sale_price, original_price } = product;

  return (
    <div>
      <h1>{title}</h1>
      <p>{sale_price}đ</p>
      <img src={thumbnail} alt={title} />
    </div>
  );
}

export default ProductDetail;
