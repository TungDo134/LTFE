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

export const getOrdersByUserApi = (userId, status) => {
    let url = `${BASE_URL}?userId=${userId}`;

    if (status) {
        url += `&status=${status}`;
    }

    return axios.get(url);
};




