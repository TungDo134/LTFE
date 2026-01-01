import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    createOrderApi,
    updateOrderStatusApi, getOrdersByUserApi
} from "../services/apiOrder";
import axios from "axios";
const BASE_URL = "http://localhost:8000/orders";

const getAllOrdersApi = () => axios.get(BASE_URL);
export const updateOrderStatus = createAsyncThunk(
    "orders/updateStatus",
    async ({ orderId, status }) => {
        const res = await updateOrderStatusApi(orderId, status);
        return res.data;
    }
);
export const fetchOrdersByUser = createAsyncThunk(
    "orders/fetchByUser",
    async ({ userId, status }) => {
        const res = await getOrdersByUserApi(userId, status);
        return res.data;
    }
);

const orderSlice = createSlice({
    name: "orders",
    initialState: {
        list: [],
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrdersByUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchOrdersByUser.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            });
    },
});
// const orderSlice = createSlice({
//     name: "orders",
//     initialState: {
//         list: [],
//         loading: false,
//     },
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(createOrder.pending, (state) => {
//                 state.loading = true;
//             })
//             .addCase(createOrder.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.list.unshift(action.payload);
//             })
//             .addCase(fetchOrdersByUser.pending, (state) => {
//                 state.loading = true;
//             })
//             .addCase(fetchOrdersByUser.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.list = action.payload;
//             })
//             .addCase(updateOrderStatus.fulfilled, (state, action) => {
//                 const idx = state.list.findIndex(
//                     (o) => o.id === action.payload.id
//                 );
//                 if (idx !== -1) {
//                     state.list[idx] = action.payload;
//                 }
//             });
//     },
// });
export const createOrder = createAsyncThunk(
    "orders/create",
    async ({ userId, items, total }) => {

        // 1. Lấy toàn bộ orders hiện có
        const res = await getAllOrdersApi();
        const orders = res.data;

        // 2. Tính số order tiếp theo
        const nextNumber = orders.length + 1;

        // 3. Format order-00x
        const orderId = `order-${String(nextNumber).padStart(3, "0")}`;

        // 4. Tạo order
        const order = {
            id: orderId,
            userId,
            items,
            total,
            status: "waiting",
            date: new Date().toISOString().slice(0, 10),
            canReview: false,
        };

        // 5. Lưu vào json-server
        const createRes = await createOrderApi(order);
        return createRes.data;
    }
);
// export const fetchOrdersByUser = createAsyncThunk(
//     "orders/fetchByUser",
//     async (userId) => {
//         const res = await getOrdersByUserApi(userId);
//         return res.data;
//     }
// );

export default orderSlice.reducer;
