export async function getPurchaseHistory({ id_user }) {
  const res = await fetch(
    `http://localhost:8000/purchase_history?id_user=${id_user}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  const data = await res.json();
  console.log("Dữ liệu thực tế từ API:", data);

  return data;
}
