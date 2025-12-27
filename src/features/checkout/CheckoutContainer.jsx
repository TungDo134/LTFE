import { useSelector } from "react-redux";
import CheckoutItem from "./CheckoutItem";
import CheckoutSummary from "./CheckoutSummary";
import CheckoutForm from "./CheckoutForm";
import PaymentMethod from "./PaymentMethod";
import Heading from "../../ui/Heading";

function CheckoutContainer() {
    const items = useSelector((state) =>
        state.cart.list.filter((item) => item.selected)
    );

    if (items.length === 0) {
        return <p>Không có sản phẩm để thanh toán</p>;
    }

    return (
        <>
            <Heading>Thanh toán</Heading>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* LEFT */}
                <div className="md:col-span-2 space-y-4">
                    {items.map((item) => (
                        <CheckoutItem key={item.id} item={item} />
                    ))}

                    <CheckoutForm />
                    <PaymentMethod />
                </div>

                {/* RIGHT */}
                <CheckoutSummary items={items} />
            </div>
        </>
    );
}

export default CheckoutContainer;
