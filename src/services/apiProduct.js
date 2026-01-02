import axios from "axios";

// best seller data (Fake "isBestSeller": true)
export async function getProductBestSeller() {
  const res = await fetch("http://localhost:8000/games");

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const products = await res.json();

  return products.filter((p) => p.isBestSeller);
}

// all data have pagination
export async function getProducts({ page = 1, limit = 12, category }) {
  const res = await fetch("http://localhost:8000/games");

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  let data = await res.json();

  // Filter theo cate (nếu có)
  if (category) {
    data = data.filter((product) =>
      product.metadata?.categories?.includes(category)
    );
  }

  const totalProduct = data.length;

  // Pagination
  if (limit) {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    data = data.slice(startIndex, endIndex);
  }
  return { data, totalProduct };
}

// all data by categories
export async function getProductByCate(category) {
  const res = await fetch("http://localhost:8000/games");

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const products = await res.json();

  return products.filter((product) =>
    product.metadata?.categories?.includes(category)
  );
}

// search by keyword
export async function searchProductByKeyword(keyword = "") {
  const url = `http://localhost:8000/games`; // Lấy toàn bộ
  const res = await axios.get(url);

  if (!keyword.trim()) return res;

  // Search bằng filter
  const filteredData = res.data.filter((item) =>
    item.title.toLowerCase().includes(keyword.toLowerCase())
  );

  //  object có cấu trúc giống axios response
  return { ...res, data: filteredData };
}

// detail
export async function getProduct(id) {
  const res = await fetch(`http://localhost:8000/games/${id}`);

  if (!res.ok) {
    throw new Error("Product not found");
  }

  return res.json();
}

export async function getAllCategories() {
  const res = await fetch(`http://localhost:8000/categories`);
  if (!res.ok) {
    throw new Error("Categories not found");
  }
  return res.json();
}

// export async function getFeatureProducts(page) {
//   const limit = 8;
//   const start = (page - 1) * limit;

//   // Filter theo cate (nếu có)
//   if (category) {
//     data = data.filter((product) => product.includes(product.isFeatureProduct));
//   }

//   const res = await fetch(
//     `http://localhost:8000/games?_start=${start}&_limit=${limit}`
//   );
//   if (!res.ok) {
//     throw new Error("Failed to fetch featured products");
//   }
//   return res.json();
// }

export async function getFeatureProducts() {
  const res = await fetch("http://localhost:8000/games");

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const products = await res.json();
  console.log();
  return products.filter((p) => p.isFeatureProduct);
}
