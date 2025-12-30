import { useSelector, useDispatch } from "react-redux";
import { resetCart, selectAll } from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";

function CartSummary() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const list = useSelector((state) => state.cart.list);

  const selectedItems = list.filter((item) => item.selected);

  const total = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="mt-6 border-t pt-4 space-y-2">
      <h3 className="text-lg font-semibold">Tổng tiền: {total} đ</h3>

      <div className="flex gap-2">
        {/* Thanh toán */}
        <button
          disabled={selectedItems.length === 0}
          onClick={() => navigate("/checkout")}
          className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
        >
          Thanh toán
        </button>

        {/* Bỏ chọn tất cả */}
        <button
          onClick={() => dispatch(selectAll(false))}
          className="rounded bg-gray-400 px-4 py-2 text-white"
        >
          Bỏ chọn tất cả
        </button>
        <button
          onClick={() => dispatch(selectAll(true))}
          className="rounded bg-green-500 px-4 py-2 text-white"
        >
          Chọn tất cả
        </button>

        {/* Xóa toàn bộ */}
        <button
          onClick={() => dispatch(resetCart())}
          className="rounded bg-red-500 px-4 py-2 text-white"
        >
          Xóa giỏ
        </button>
      </div>
    </div>
  );
}

export default CartSummary;
