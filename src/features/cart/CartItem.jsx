import { useDispatch } from "react-redux";
import { increase, decrease, remove, toggleSelect } from "../../redux/cartSlice";

function CartItem({ item }) {
    const dispatch = useDispatch();

    return (
        <div className="flex gap-4 border rounded p-3 items-center">
            <input
                type="checkbox"
                checked={item.selected}
                onChange={() => dispatch(toggleSelect(item.id))}
            />

            <img
                src={item.thumbnail}
                className="w-24 h-16 object-cover rounded"
            />

            <div className="flex-1">
                <h3 className="font-medium">{item.title}</h3>
                <p className="text-red-500 font-semibold">{item.price} đ</p>

                <div className="flex items-center gap-2 mt-2">
                    <button onClick={() => dispatch(decrease(item.id))}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => dispatch(increase(item.id))}>+</button>

                    <button
                        onClick={() => dispatch(remove(item.id))}
                        className="ml-auto text-red-500"
                    >
                        Xóa
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CartItem;
