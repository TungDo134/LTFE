import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import CartActions from "./CartActions";

function CartList() {
    const list = useSelector((state) => state.cart.list);

    if (list.length === 0) {
        return (
            <div className="bg-white p-6 rounded text-center">
                Giỏ hàng trống
            </div>
        );
    }

    return (
        <div className="bg-white rounded p-4 space-y-4">
            <CartActions />

            {list.map((item) => (
                <CartItem key={item.id} item={item} />
            ))}
        </div>
    );
}

export default CartList;
