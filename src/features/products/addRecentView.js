export function addRecentView(product) {
  if (!product || !product.id) return;

  // lấy list từ localstorage
  const history = JSON.parse(localStorage.getItem("recent_views")) || [];

  // check exist
  const filteredHistory = history.filter((item) => item.id !== product.id);

  // add sp mới
  const newHistory = [
    {
      id: product.id,
      title: product.title,
      price: product.sale_price,
      thumbnail: product.thumbnail,
      viewedAt: new Date().toISOString(),
    },
    ...filteredHistory,
  ];

  // limit sp
  const limitedHistory = newHistory.slice(0, 10);

  // Lưu mới vào ls
  localStorage.setItem("recent_views", JSON.stringify(limitedHistory));
}
