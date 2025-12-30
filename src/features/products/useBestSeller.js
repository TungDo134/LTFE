import { useState,useEffect } from "react";
import { getProductBestSeller } from "../../services/apiProduct";

export function useBestSeller() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  async function fetchData() {
    try {
      const data = await getProductBestSeller();
      setProducts(data);
    } catch (error) {
      console.error("Error: ", error);
    } finally {
      setLoading(false); 
    }
  }

  fetchData();
}, []);

return { products, loading };

}