import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { CiFilter } from "react-icons/ci";

import { useCategories } from "./useCategories";
function SearchBar() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [value, setValue] = useState(searchParams.get("category") || "");
  const [sortVal, setSortVal] = useState(searchParams.get("sort") || "");

  const { item } = useCategories();

  function handleChangeSelect(e) {
    setValue(e.target.value);
  }

  function handleChangeSort(e) {
    setSortVal(e.target.value);
  }

  if (!item) return;

  function handleSubmit() {
    // giữ lại 'search' (nếu có)
    const params = new URLSearchParams(searchParams);

    // Category
    const selectedCategory = item.find(
      (cat) => String(cat.id) === String(value)
    );
    if (selectedCategory) {
      params.set("category", selectedCategory.name);
    } else {
      params.delete("category");
    }

    // Sort
    if (sortVal) {
      params.set("sort", sortVal);
    } else {
      params.delete("sort");
    }

    navigate(`/product?${params.toString()}`);
  }

  return (
    <div className="flex items-center gap-x-3 mb-3">
      {/* Category */}
      <div className="flex items-center gap-2">
        <label>Thể loại: </label>
        <select
          value={value}
          onChange={(e) => handleChangeSelect(e)}
          name="tag"
          className="px-8 py-1 border border-solid rounded-sm text-sm w-[50%]"
        >
          <option value="">Tất cả</option>
          {item.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Sort */}
      <div className="flex items-center gap-2 ">
        <div>
          <label>Sắp xếp: </label>
          <select
            value={sortVal}
            onChange={(e) => handleChangeSort(e)}
            className="px-8 py-1 border border-solid rounded-sm"
            name="sort"
          >
            <option value="">Mặc định</option>
            <option value="price-asc">Giá thấp - cao</option>
            <option value="price-desc">Giá cao - thấp</option>
            <option value="name-asc">Tên từ A - Z</option>
            <option value="name-desc">Tên từ Z - A</option>
          </select>
        </div>
        <div className="ml-4">
          <button
            onClick={handleSubmit}
            className={`p-1 w-20 border border-solid rounded-sm bg-blue-500 text-white flex items-center justify-around cursor-pointer`}
          >
            <CiFilter />
            Lọc
          </button>
        </div>
      </div>
    </div>
  );
}
export default SearchBar;
