import { createSlice, nanoid } from "@reduxjs/toolkit";

// load từ localStorage
const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];

const initialState = {
    list: savedOrders,
};

const saveOrders = (orders) => {
    localStorage.setItem("orders", JSON.stringify(orders));
};

const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        createOrder: {
            reducer(state, action) {
                state.list.unshift(action.payload); // mới nhất lên đầu
                saveOrders(state.list);
            },
            prepare({ userId, items, total }) {
                return {
                    payload: {
                        id: nanoid(),
                        userId,
                        items,
                        total,
                        status: "completed",
                        date: new Date().toISOString().slice(0, 10),
                        canReview: true,
                    },
                };
            },
        },

        loadOrdersFromJson(state, action) {
            state.list = action.payload;
            saveOrders(state.list);
        },
    },
});

export const { createOrder, loadOrdersFromJson } = orderSlice.actions;
export default orderSlice.reducer;
