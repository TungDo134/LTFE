import { useSelector } from "react-redux";
import { ShoppingCart } from "lucide-react";
import CartList from "./CartList";
import CheckoutPanel from "./CheckoutPanel";
import Heading from "../../ui/Heading";

function CartContainer() {
    const list = useSelector((state) => state.cart.list);

    if (list.length === 0) {
        return (
            <>
                <Heading>Giỏ hàng</Heading>
                <div className="flex flex-col items-center py-16 text-gray-500">
                    <ShoppingCart size={64} className="mb-4 opacity-50" />
                    <p className="text-lg font-medium">Giỏ hàng trống</p>
                </div>
            </>
        );
    }

    return (
        <>
            <Heading>Giỏ hàng</Heading>

            <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <CartList />
                </div>
                <CheckoutPanel />
            </div>
        </>
    );
}

export default CartContainer;
