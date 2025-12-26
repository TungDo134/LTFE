import { useState } from "react";
import { useCategories } from "./useCategories";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";

function SelectCategory() {
  const navigate = useNavigate();
  const [value, setValue] = useState("");

  // custom hook
  const { item } = useCategories();

  function handleChangeSelect(e) {
    const selectedId = e.target.value;
    setValue(selectedId);

    const selectedCategory = item.find(
      (cat) => String(cat.id) === String(selectedId)
    );

    if (selectedCategory) {
      navigate(`/product/categories/${selectedCategory.name}`);
    }
  }

  if (!item) return;

  return (
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
  );
}

export default SelectCategory;
