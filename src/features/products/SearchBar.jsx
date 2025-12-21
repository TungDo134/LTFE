import Button from "../../ui/Button";
import SelectCategory from "./SelectCategory";
import Sort from "./Sort";
import { CiFilter } from "react-icons/ci";

function SearchBar() {
  return (
    <div className="grid grid-cols-3 mb-3">
      <SelectCategory />
      <Sort />
      <Button color="primary">
        <CiFilter className="text-xl" />
        Lọc
      </Button>
    </div>
  );
}

export default SearchBar;
