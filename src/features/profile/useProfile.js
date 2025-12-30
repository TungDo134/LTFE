import { useState, useEffect } from "react";

export function useProfile(apiFunction, param) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!param) return;

    async function fetchData() {
      try {
        setLoading(true);
        const result = await apiFunction({ id_user: param });
        console.log(result);
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [apiFunction, param]);

  return { data, loading, error };
}
