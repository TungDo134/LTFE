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

// search by keyword + sort
export async function searchProductByKeyword(keyword = "", sortBy = "") {
  const url = `http://localhost:8000/games`;
  const res = await axios.get(url);
  let data = res.data;

  // Search
  if (keyword.trim()) {
    data = data.filter((item) =>
      item.title.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  // Sort
  if (sortBy) {
    const [field, order] = sortBy.split("-");

    data = [...data].sort((a, b) => {
      let valA, valB;

      if (field === "price") {
        valA = Number(a.sale_price);
        valB = Number(b.sale_price);
        return order === "asc" ? valA - valB : valB - valA;
      }

      if (field === "name" || field === "title") {
        valA = (a.title || "").toLowerCase();
        valB = (b.title || "").toLowerCase();
        if (order === "asc") return valA.localeCompare(valB);
        if (order === "desc") return valB.localeCompare(valA);
      }

      return 0;
    });
  }

  return { ...res, data };
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
