import { useDispatch, useSelector } from "react-redux";
import {increase, decrease, remove, resetCart,} from "../redux/cartSlice";

const Cart = () => {
    const dispatch = useDispatch();
    const list = useSelector((state) => state.cart.list);

    const total = list.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    if (list.length === 0) {
        return <h2>Giỏ hàng trống</h2>;
    }

    return (
        <div>
            <h1>Giỏ hàng</h1>

            {list.map((item) => (
                <div key={item.id} style={{ marginBottom: 20 }}>
                    <img src={item.thumbnail} width={100} />
                    <h3>{item.title}</h3>
                    <p>{item.price.toLocaleString()} đ</p>

                    <button onClick={() => dispatch(decrease(item.id))}>-</button>
                    <span style={{ margin: "0 10px" }}>{item.quantity}</span>
                    <button onClick={() => dispatch(increase(item.id))}>+</button>

                    <button
                        style={{ marginLeft: 10 }}
                        onClick={() => dispatch(remove(item.id))}
                    >
                        Xóa
                    </button>
                </div>
            ))}

            <h2>Tổng tiền: {total.toLocaleString()} đ</h2>

            <button onClick={() => dispatch(resetCart())}>
                Xóa toàn bộ giỏ
            </button>
        </div>
    );
};
    export default Cart;