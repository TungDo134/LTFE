import { useEffect, useState } from "react";
import { getProductByCate, getProducts } from "../../services/apiProduct";

export function useProducts({ category }) {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [error, setError] = useState(null);

  // ẩn button "Xem thêm"
  const [hasMore, setHasMore] = useState();

  // Reset khi category thay đổi
  useEffect(() => {
    setPage(1);
  }, [category]);

  useEffect(() => {
    let isMounted = true;

    if (page === 1) {
      setIsLoading(true);
      // setProducts([]);
    } else setIsFetchingMore(true);

    setError(null);

    async function fetchData() {
      try {
        const { data, totalProduct: more } = await getProducts({
          page,
          category,
        });
        if (!isMounted) return;

        setProducts((prevItem) => (page === 1 ? data : [...prevItem, ...data]));
        setHasMore(more);
      } catch (err) {
        if (isMounted) setError("Có lỗi khi tải sản phẩm");
      } finally {
        if (isMounted) {
          setIsLoading(false);
          setIsFetchingMore(false);
        }
      }
    }

    fetchData();
    return () => {
      isMounted = false;
    };
  }, [page, category]);

  return {
    products,
    isLoading,
    error,
    isFetchingMore,
    hasMore,
    loadMore: () => setPage((p) => p + 1),
  };
}
