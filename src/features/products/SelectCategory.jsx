import { useState } from "react";

function SelectCategory() {
  const [value, setValue] = useState("");

  function handleChangeSelect(e) {
    setValue(e.target.value);
    console.log(e.target.value);
  }

  return (
    <div>
      <label>Thể loại: </label>
      <select
        value={value}
        onChange={(e) => handleChangeSelect(e)}
        name="tag"
        className="px-8 py-1 border border-solid rounded-sm text-sm"
      >
        <option value="Kinh Dị">Kinh Dị</option>
        <option value="Giả tưởng">Giả tưởng</option>
      </select>
    </div>
  );
}

export default SelectCategory;
