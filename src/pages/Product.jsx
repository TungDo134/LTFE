import ProductList from "../features/products/ProductList";
import { GrPowerReset } from "react-icons/gr";
import Heading from "../ui/Heading";
import SearchBar from "../features/products/SearchBar";

function Product() {
  return (
    <div className="box-content mx-auto max-w-300 px-6">
      <Heading>Game trên Steam</Heading>
      <SearchBar />
      <span className="flex items-center gap-x-3 text-red-500 cursor-pointer">
        <GrPowerReset className="text-xl" />
        <p className="text-sm hover:underline">Khôi phục bộ lọc</p>
      </span>

      {/* CONTENT */}
      <ProductList />
    </div>
  );
}

export default Product;
