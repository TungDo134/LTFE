import { useEffect, useState } from "react";
import { getProduct } from "../../services/apiProduct";

export function useProduct(id) {
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        const data = await getProduct(id);
        if (isMounted) setProduct(data);
      } catch (err) {
        if (isMounted) setError("Có lỗi khi tải sản phẩm");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return { product, isLoading, error };
}
