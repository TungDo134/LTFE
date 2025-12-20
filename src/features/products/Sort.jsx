import { useState } from "react";

function SelectCategory() {
  const [value, setValue] = useState("");

  function handleChangeSelect(e) {
    setValue(e.target.value);
    console.log(e.target.value);
  }

  return (
    <div>
      <label>Sắp xếp: </label>
      <select
        value={value}
        onChange={(e) => handleChangeSelect(e)}
        className="px-8 py-1 border border-solid rounded-sm"
        name="sort"
      >
        <option value="">Mặc định</option>
        <option value="sales-desc">Bán chạy nhất</option>
        <option value="date-desc">Mới cập nhật</option>
        <option value="price-asc">Giá thấp đến cao</option>
        <option value="price-desc">Giá cao đến thấp</option>
        <option value="name-asc">Tên từ A đến Z</option>
        <option value="name-desc">Tên từ Z đến A</option>
      </select>
    </div>
  );
}

export default SelectCategory;
