import axios from "axios";

const BASE_URL = "http://localhost:8000/vouchers";

export const getVoucherByCodeApi = (code) => {
    return axios.get(`${BASE_URL}?code=${code}`);
};
