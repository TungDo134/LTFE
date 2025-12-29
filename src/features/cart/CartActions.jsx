import { useDispatch, useSelector } from "react-redux";
import { selectAll } from "../../redux/cartSlice";

function CartActions() {
    const dispatch = useDispatch();
    const list = useSelector((state) => state.cart.list);

    const allSelected = list.every((i) => i.selected);

    return (
        <div className="flex items-center gap-3 border-b pb-3">
            <input
                type="checkbox"                checked={allSelected}
                onChange={(e) => dispatch(selectAll(e.target.checked))}
            />
            <span className="text-sm">
        {allSelected ? "Bỏ chọn tất cả" : "Chọn tất cả"}
      </span>
        </div>
    );
}

export default CartActions;
