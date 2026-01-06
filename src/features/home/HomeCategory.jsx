import { useState, useEffect } from "react";
import { TableOfContents } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCategories } from "../products/useCategories.js";
import Spinner from "../../ui/Spinner.jsx";

function HomeCategory() {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  // hook custom lại
  const { item } = useCategories();

  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  if (!item) return <Spinner />;

  return (
    <div className="w-full bg-white border-2 border-[#f3f4f6]">
      <div className="mx-auto max-w-7xl py-2 px-20">
        <div
          className="flex items-center my-3 gap-2 cursor-pointer"
          onClick={toggleMenu}
        >
          <TableOfContents size={20} className="text-black" />
          <span className="text-md font-bold  ">Danh mục sản phẩm</span>
        </div>

        {isOpen && (
          <ul className="absolute bg-white border shadow-md w-auto z-50 max-h-[400px] overflow-y-auto">
            {item.map((cat) => (
              <li
                onClick={() => navigate(`/product/categories/${cat.name}`)}
                className="p-2 hover:bg-gray-100 cursor-pointer border-b"
                key={cat.id}
              >
                {cat.name}
              </li>
            ))}
            <li className="p-2 hover:bg-gray-100 cursor-pointer border-b">
              <Link to={""}>
                <span className="font-bold">Xem thêm</span>
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
export default HomeCategory;
