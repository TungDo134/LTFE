import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function CartSummary() {
    const navigate = useNavigate();
    const list = useSelector((state) => state.cart.list);

    const selectedItems = list.filter((i) => i.selected);

    const total = selectedItems.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0
    );

    return (
        <div className="bg-white rounded p-4 space-y-3 sticky top-20">
            <h3 className="font-semibold text-lg">Thanh toán</h3>

            <div className="flex justify-between text-sm">
                <span>Tạm tính</span>
                <span>{total} đ</span>
            </div>

            <div className="flex justify-between font-semibold">
                <span>Tổng tiền</span>
                <span className="text-red-500">{total} đ</span>
            </div>

            <button
                disabled={selectedItems.length === 0}
                onClick={() => navigate("/checkout")}
                className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
            >
                Thanh toán
            </button>
        </div>
    );
}

export default CartSummary;
