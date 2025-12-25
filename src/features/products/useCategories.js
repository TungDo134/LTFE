import { useEffect, useState } from "react";
import { getAllCategories } from "../../services/apiProduct";

export function useCategories() {
  const [item, setItem] = useState("");
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAllCategories();
        setItem(data);
      } catch (error) {
        console.error("Error: ", error);
      }
    }
    fetchData();
  }, []);

  return { item };
}
