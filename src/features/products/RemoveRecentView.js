// RemoveToHistory.js
export function RemoveRecentView(id, setRecentProducts, remove_all) {
  if (remove_all) {
    localStorage.removeItem("recent_views");
    setRecentProducts([]);
    return;
  }

  const history = JSON.parse(localStorage.getItem("recent_views")) || [];

  const updatedHistory = history.filter((item) => item.id !== id);

  localStorage.setItem("recent_views", JSON.stringify(updatedHistory));

  setRecentProducts(updatedHistory);
}
