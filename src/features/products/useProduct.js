import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../../services/apiProduct";
import { useParams } from "react-router-dom";

export function useProduct() {
  const { productId } = useParams();

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProduct(productId),
  });

  return { product, isLoading, error };
}
