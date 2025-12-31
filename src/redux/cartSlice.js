import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    list: JSON.parse(localStorage.getItem("cart")) || [],
};

const save = (state) => {
    localStorage.setItem("cart", JSON.stringify(state.list));
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action) {
            const product = action.payload;
            const item = state.list.find(i => i.id === product.id);

            if (item) {
                item.quantity += 1;
            } else {
                state.list.push({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    thumbnail: product.thumbnail,
                    quantity: 1,
                    selected: true,
                });
            }
            save(state);
        },

        toggleSelect(state, action) {
            const item = state.list.find(i => i.id === action.payload);
            if (item) item.selected = !item.selected;
            save(state);
        },

        selectAll(state, action) {
            state.list.forEach(i => (i.selected = action.payload));
            save(state);
        },

        increase(state, action) {
            const item = state.list.find(i => i.id === action.payload);
            if (item) item.quantity++;
            save(state);
        },

        decrease(state, action) {
            const item = state.list.find(i => i.id === action.payload);
            if (item && item.quantity > 1) item.quantity--;
            save(state);
        },

        remove(state, action) {
            state.list = state.list.filter(i => i.id !== action.payload);
            save(state);
        },

        resetCart(state) {
            state.list = [];
            localStorage.removeItem("cart");
        },
    },
});

export const {
    addToCart,
    increase,
    decrease,
    remove,
    resetCart,
    toggleSelect,
    selectAll,
} = cartSlice.actions;

export default cartSlice.reducer;
