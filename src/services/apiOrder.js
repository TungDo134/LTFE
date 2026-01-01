import axios from "axios";

const BASE_URL = "http://localhost:8000/orders";

export const createOrderApi = (order) => {
    return axios.post(BASE_URL, order);
};

export const updateOrderStatusApi = (orderId, status) => {
    return axios.patch(`${BASE_URL}/${orderId}`, {
        status,
    });
};

export const getOrdersByStatusApi = (status) => {
    return axios.get(`${BASE_URL}?status=${status}`);
};
export const getOrdersByUserApi = (userId) => {
    return axios.get(`${BASE_URL}?userId=${userId}`);
};
export const getLastOrderApi = () => {
    return axios.get(
        "http://localhost:8000/orders?_sort=id&_order=desc&_limit=1"
    );
};