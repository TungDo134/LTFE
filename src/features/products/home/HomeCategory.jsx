import { useState, useEffect } from "react";
import { TableOfContents } from "lucide-react";
import { getAllCategories } from "../../../services/apiProduct";
import { Link } from "react-router-dom";

function HomeCategory() {
  const [item, setItem] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  function toggleMenu() {
    setIsOpen(!isOpen);
  }
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAllCategories();
        setItem(data);
      } catch (error) {
        console.error("Error: ", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="w-full bg-gray-300">
      <div className="mx-auto max-w-7xl py-2">
        <div className="flex items-center my-3 gap-2 cursor-pointer" onClick={toggleMenu}>
          <TableOfContents size={20} className="text-black" />
          <span className="text-lg font-bold uppercase ">Danh mục sản phẩm</span>
        </div>
        {isOpen && (
          <ul className="absolute bg-white border shadow-md w-auto z-50 max-h-[400px] overflow-y-auto">
            {item.map((cat) => (
              <li className="p-2 hover:bg-gray-100 cursor-pointer border-b" key={cat.id}>
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
