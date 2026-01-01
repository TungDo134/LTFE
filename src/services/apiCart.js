import axios from "axios";

const API_URL = "http://localhost:8000";

export const cartApi = {
    getCartByUser(userId) {
        return axios.get(`${API_URL}/carts?userId=${userId}`);
    },

    updateCart(cartId, data) {
        return axios.patch(`${API_URL}/carts/${cartId}`, data);
    },
    createCart(data) {
        return axios.post(`${API_URL}/carts`, data);
    },
};
