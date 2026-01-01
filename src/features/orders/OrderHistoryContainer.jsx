import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import OrderTabs from "./OrderTabs";
import OrderList from "./OrderList";
import Heading from "../../ui/Heading";
import { fetchOrdersByUser } from "../../redux/orderSlice";

function OrderHistoryContainer() {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const orders = useSelector(state => state.orders.list);

    const [activeTab, setActiveTab] = useState("all");

    const userOrders = orders.filter(o => o.userId === user.id);
    useEffect(() => {
        if (user) {
            dispatch(fetchOrdersByUser(user.id));
        }
    }, [user, dispatch]);
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
