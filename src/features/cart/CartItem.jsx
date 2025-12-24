import { useDispatch } from "react-redux";
import { increase, decrease, remove } from "../../redux/cartSlice";

function CartItem({ item }) {
    const dispatch = useDispatch();

    return (
        <div className="flex gap-4 border p-3 rounded">
            <img src={item.thumbnail} className="w-24 rounded" />

            <div className="flex-1">
                <h3 className="font-medium">{item.title}</h3>
                <p>{item.price} đ</p>

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
