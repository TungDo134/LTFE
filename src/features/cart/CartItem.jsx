import { useDispatch } from "react-redux";
import { increase, decrease, remove, toggleSelect } from "../../redux/cartSlice";
import { Trash2 } from "lucide-react";
import { formatNumber } from "../../utils/formatNumber";

function CartItem({ item }) {
    const dispatch = useDispatch();

    return (
        <div className="flex gap-4 rounded-lg border bg-white p-4 shadow-sm hover:shadow-md transition">
            {/* CHECKBOX */}
            <input
                type="checkbox"
                checked={item.selected}
                onChange={() => dispatch(toggleSelect(item.id))}
                className="mt-2 accent-blue-600"
            />

            {/* IMAGE */}
            <img
                src={item.thumbnail}
                alt={item.title}
                className="h-24 w-40 rounded-md object-cover"
            />

            {/* INFO */}
            <div className="flex flex-1 flex-col justify-between">
                <div>
                    <h3 className="font-semibold text-gray-900 line-clamp-2">
                        {item.title}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                        Tình trạng: <span className="text-green-600">Còn hàng</span>
                    </p>
                </div>

                {/* ACTION */}
                <div className="mt-2 flex items-center justify-between">
                    {/* QUANTITY */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => dispatch(decrease(item.id))}
                            className="h-8 w-8 rounded border text-lg hover:bg-gray-100"
                        >
                            −
                        </button>

                        <span className="w-6 text-center font-medium">
              {item.quantity}
            </span>

                        <button
                            onClick={() => dispatch(increase(item.id))}
                            className="h-8 w-8 rounded border text-lg hover:bg-gray-100"
                        >
                            +
                        </button>
                    </div>

                    {/* PRICE */}
                    <div className="text-right">
                        <p className="font-semibold text-blue-600">
                            {formatNumber(item.price * item.quantity)}
                        </p>
                        <p className="text-xs text-gray-400">
                            {formatNumber(item.price)} / sản phẩm
                        </p>
                    </div>
                </div>
            </div>

            {/* REMOVE */}
            <button
                onClick={() => dispatch(remove(item.id))}
                className="text-gray-400 hover:text-red-500 transition"
                title="Xóa sản phẩm"
            >
                <Trash2 size={20} />
            </button>
        </div>
    );
}

export default CartItem;
