import { useDispatch, useSelector } from "react-redux";
import { toggleSelectAll } from "../../redux/cartSlice";

function CartActions() {
    const dispatch = useDispatch();
    const items = useSelector(state => state.cart.items);

    const allSelected = items.length > 0 && items.every(i => i.selected);

    return (
        <div className="flex items-center gap-3 border-b pb-3">
            <input
                type="checkbox"
                checked={allSelected}
                onChange={(e) =>
                    dispatch(toggleSelectAll(e.target.checked))
                }
            />
            <span className="text-sm">
                {allSelected ? "Bỏ chọn tất cả" : "Chọn tất cả"}
            </span>
        </div>
    );
}

export default CartActions;
