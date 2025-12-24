import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import Heading from "../../ui/Heading";

function CartContainer() {
    const list = useSelector((state) => state.cart.list);

    if (list.length === 0) {
        return <p>Giỏ hàng trống</p>;
    }

    return (
        <>
            <Heading>Giỏ hàng</Heading>

            <div className="space-y-4">
                {list.map((item) => (
                    <CartItem key={item.id} item={item} />
                ))}
            </div>

            <CartSummary />
        </>
    );
}

export default CartContainer;
