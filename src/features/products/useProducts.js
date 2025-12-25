import { useEffect, useState } from "react";
import { getProductByCate, getProducts } from "../../services/apiProduct";

// export function useProducts(category) {
//   const [products, setProducts] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     let isMounted = true;

//     setIsLoading(true);
//     setError(null);

//     async function fetchData() {
//       try {
//         console.log(category);
//         const data = category
//           ? await getProductByCate(category)
//           : await getProducts();

//         if (isMounted) setProducts(data);
//       } catch (err) {
//         if (isMounted) setError("Có lỗi khi tải sản phẩm");
//       } finally {
//         if (isMounted) setIsLoading(false);
//       }
//     }

//     fetchData();

//     return () => {
//       isMounted = false;
//     };
//   }, [category]);

//   return { products, isLoading, error };
// }

export function useProducts({ category }) {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [error, setError] = useState(null);

  // ẩn UI phân trang
  const [hasMore, setHasMore] = useState();

  // Reset khi category thay đổi
  useEffect(() => {
    setPage(1);
    setProducts([]);
  }, [category]);

  useEffect(() => {
    let isMounted = true;

    // Chỉ hiện Spinner khi tải trang đầu tiên
    if (page === 1) setIsLoading(true);
    else setIsFetchingMore(true);

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
  }, [page]);

  return {
    products,
    isLoading,
    error,
    isFetchingMore,
    hasMore,
    loadMore: () => setPage((p) => p + 1),
  };
}
