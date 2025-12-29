import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    list: [], // danh sách đơn hàng
};

const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        createOrder: {
            reducer(state, action) {
                state.list.push(action.payload);
            },
            prepare({ userId, items, total }) {
                return {
                    payload: {
                        id: nanoid(),
                        userId,
                        items,
                        total,
                        status: "COMPLETED", // giả lập hoàn thành
                        createdAt: new Date().toISOString(),
                    },
                };
            },
        },
    },
});

export const { createOrder } = orderSlice.actions;
export default orderSlice.reducer;
