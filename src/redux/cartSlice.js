import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    list: JSON.parse(localStorage.getItem("cart")) || [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;

            const item = state.list.find(
                (i) =>  i.id === product.id
            );
            if (item){
                item.quantity += 1;
            }else {
                state.list.push({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    thumbnail: product.thumbnail,
                    quantity: 1,
                });
            }
            localStorage.setItem("cart", JSON.stringify(state.list));
        },

        increase: (state, action) => {
            const item = state.list.find(
                (i) => i.id === action.payload
            );
            if(item) item.quantity += 1;

            localStorage.setItem("cart", JSON.stringify(state.list));
        },

        decrease:(state, action) => {
            const item = state.list.find(
                (i) => i.id === action.payload
            );
            if(item && item.quantity > 1) item.quantity -= 1;

            localStorage.setItem("cart", JSON.stringify(state.list));
        },

        remove:(state, action) => {
            state.list = state.list.filter(
                (i) => i.id !== action.payload
            );
            localStorage.setItem("cart", JSON.stringify(state.list));
        },
        resetCart: (state) => {
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
} = cartSlice.actions;
export default cartSlice.reducer;