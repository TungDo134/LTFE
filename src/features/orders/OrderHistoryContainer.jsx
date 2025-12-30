import { useState } from "react";
import { useSelector } from "react-redux";
import OrderTabs from "./OrderTabs";
import OrderList from "./OrderList";
import Heading from "../../ui/Heading";

function OrderHistoryContainer() {
    const { user } = useSelector(state => state.auth);
    const orders = useSelector(state => state.orders.list);

    const [activeTab, setActiveTab] = useState("all");

    const userOrders = orders.filter(o => o.userId === user.id);

    const filteredOrders =
        activeTab === "all"
            ? userOrders
            : userOrders.filter(o => o.status === activeTab);

    return (
        <>
            <Heading>Lịch sử đơn hàng</Heading>

            <OrderTabs active={activeTab} setActive={setActiveTab} />
            <OrderList orders={filteredOrders} />
        </>
    );
}

export default OrderHistoryContainer;
