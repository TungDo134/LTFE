// Fake API from folder data (json-server)
export async function getProducts() {
    const res = await fetch("http://localhost:8000/games");

    if (!res.ok) {
        throw new Error("Failed to fetch products");
    }

    return res.json();
}

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

export async function getFeatureProducts(page) {
    const limit = 8;
    const start = (page - 1) * limit;
    const res = await fetch(`http://localhost:8000/games?_start=${start}&_limit=${limit}`);
    if (!res.ok) {
        throw new Error("Failed to fetch featured products");
    }
    return res.json();
}