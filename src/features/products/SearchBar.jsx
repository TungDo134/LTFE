import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import { CiFilter } from "react-icons/ci";

import { useCategories } from "./useCategories";
import { GrPowerReset } from "react-icons/gr";

function SearchBar() {
  // lấy ra giá trị :category
  const { category: categoryHome } = useParams();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [value, setValue] = useState("");
  const [sortVal, setSortVal] = useState(searchParams.get("sort") || "");

  const { item } = useCategories();

  function handleChangeSelect(e) {
    setValue(e.target.value);
  }

  function handleChangeSort(e) {
    setSortVal(e.target.value);
  }

  useEffect(() => {
    if (!item || item.length === 0) return;

    //  Có categoryHome từ params (/product/:category)
    if (categoryHome) {
      const foundCategory = item.find((cat) => cat.name === categoryHome);
      if (foundCategory) {
        setValue(String(foundCategory.id));
      }
      return;
    }

    //  Có category trong searchParams (?category=...)
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      const foundCategory = item.find((cat) => cat.name === categoryParam);
      if (foundCategory) {
        setValue(String(foundCategory.id));
      } else {
        setValue("");
      }
    } else {
      // Không có category nào
      setValue("");
    }
  }, [categoryHome, item]);

  // Submit sự kiện
  function handleSubmit() {
    // giữ lại 'search' (nếu có)
    const params = new URLSearchParams(searchParams);

    // Category
    const selectedCategory = item?.find(
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

  // Reset
  function resetAllSort() {
    setSortVal("");
    setValue("");
    navigate("/product");
  }

  return (
    <>
      <div className="flex items-center gap-x-3 mb-3">
        {/* Category */}
        <div className="flex items-center gap-2">
          <label>Thể loại: </label>
          <select
            value={value}
            onChange={handleChangeSelect}
            name="tag"
            className="px-8 py-1 border border-solid rounded-sm text-sm w-[50%]"
          >
            <option value="">Tất cả</option>
            {(item || []).map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2 ">
          <div>
            <label>Thứ tự: </label>
            <select
              value={sortVal}
              onChange={handleChangeSort}
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
              className="p-1 w-20 border border-solid rounded-sm bg-blue-500 text-white flex items-center justify-around cursor-pointer"
            >
              <CiFilter />
              Lọc
            </button>
          </div>
        </div>
      </div>

      {/* Reset */}
      <span className="flex items-center gap-x-3 text-red-500 cursor-pointer">
        <GrPowerReset className="text-xl" />
        <p onClick={resetAllSort} className="text-sm hover:underline">
          Khôi phục bộ lọc
        </p>
      </span>
    </>
  );
}

export default SearchBar;
