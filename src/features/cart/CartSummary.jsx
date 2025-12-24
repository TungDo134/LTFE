import { useSelector, useDispatch } from "react-redux";
import { resetCart } from "../../redux/cartSlice";

function CartSummary() {
    const dispatch = useDispatch();

    const total = useSelector((state) =>
        state.cart.list.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        )
    );

    return (
        <div className="mt-6 border-t pt-4">
            <h3 className="text-lg font-semibold">
                Tổng tiền: {total} đ
            </h3>

            <button
                onClick={() => dispatch(resetCart())}
                className="mt-2 rounded bg-red-500 px-4 py-2 text-white"
            >
                Xóa toàn bộ giỏ
            </button>
        </div>
    );
}

export default CartSummary;
