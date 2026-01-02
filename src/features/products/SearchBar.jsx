import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { CiFilter } from "react-icons/ci";

import { useCategories } from "./useCategories";

function SearchBar() {
  // Select Category + Sort
  const navigate = useNavigate();

  // handle value cho input
  const [value, setValue] = useState("");

  const [sortVal, setSortVal] = useState("");

  // lấy ds cate
  const { item } = useCategories();

  function handleChangeSelect(e) {
    setValue(e.target.value);
  }

  function handleChangeSort(e) {
    setSortVal(e.target.value);
  }

  if (!item) return;

  function handleSubmit() {
    //  Cate
    const selectedCategory = item.find(
      (cat) => String(cat.id) === String(value)
    );

    if (selectedCategory) {
      navigate(`/product/categories/${selectedCategory.name}`);
    }
  }

  return (
    <div className="grid grid-cols-3 mb-3">
      {/* Category */}
      <div>
        <label>Thể loại: </label>
        <select
          value={value}
          onChange={(e) => handleChangeSelect(e)}
          name="tag"
          className="px-8 py-1 border border-solid rounded-sm text-sm w-[50%]"
        >
          {item.map((cat) => (
            <option
              onClick={() => navigate(`/product/categories/${cat.name}`)}
              value={cat.id}
            >
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Sort */}
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

      <button
        onClick={handleSubmit}
        className={`p-1 w-20  border border-solid rounded-sm bg-blue-500 text-white flex items-center justify-around cursor-pointer`}
      >
        <CiFilter />
        Lọc
      </button>
    </div>
  );
}

export default SearchBar;
