import OrderItem from "./OrderItem";


function OrderList({ orders }) {
    if (orders.length === 0) {
        return (
            <p className="text-center text-gray-500 py-10">
                Không có đơn hàng nào
            </p>
        );
    }

    return (
        <div className="space-y-4">
            {orders.map(order => (
                <OrderItem key={order.id} order={order} />
            ))}
        </div>
    );
}

export default OrderList;
