import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8000";

/* ================= API ================= */

const cartApi = {
    getCartByUser(userId) {
        return axios.get(`${API_URL}/carts?userId=${userId}`);
    },

    createCart(data) {
        return axios.post(`${API_URL}/carts`, data);
    },

    updateCart(cartId, data) {
        return axios.patch(`${API_URL}/carts/${cartId}`, data);
    },
};

/* ================= THUNKS ================= */

// Fetch cart hoặc tạo mới
export const fetchCart = createAsyncThunk(
    "cart/fetch",
    async (userId) => {
        const res = await cartApi.getCartByUser(userId);

        // Chưa có cart → tạo mới
        if (res.data.length === 0) {
            const newCart = await cartApi.createCart({
                userId,
                items: [],
            });
            return newCart.data;
        }

        // Đã có
        return res.data[0];
    }
);

// Sync cart
export const syncCart = createAsyncThunk(
    "cart/sync",
    async (_, { getState }) => {
        const { cartId, items } = getState().cart;
        if (!cartId) return;
        await cartApi.updateCart(cartId, { items });
    }
);

// Add to cart + sync
export const addToCartAndSync = createAsyncThunk(
    "cart/addToCartAndSync",
    async (product, { dispatch }) => {
        dispatch(addToCart(product));
        dispatch(syncCart());
    }
);

/* ================= SLICE ================= */

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartId: null,
        items: [],
        status: "idle",
    },

    reducers: {
        addToCart(state, action) {
            const p = action.payload;
            const item = state.items.find(i => i.productId === p.id);

            if (item) {
                item.quantity++;
            } else {
                state.items.push({
                    productId: p.id,
                    title: p.title,
                    price: p.price,
                    thumbnail: p.thumbnail,
                    quantity: 1,
                    selected: true,
                });
            }
        },

        increase(state, action) {
            const item = state.items.find(i => i.productId === action.payload);
            if (item) item.quantity++;
        },

        decrease(state, action) {
            const item = state.items.find(i => i.productId === action.payload);
            if (item && item.quantity > 1) item.quantity--;
        },

        remove(state, action) {
            state.items = state.items.filter(
                i => i.productId !== action.payload
            );
        },

        toggleSelect(state, action) {
            const item = state.items.find(i => i.productId === action.payload);
            if (item) item.selected = !item.selected;
        },

        toggleSelectAll(state, action) {
            state.items.forEach(i => {
                i.selected = action.payload;
            });
        },

        resetCart(state) {
            state.items = [];
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.status = "success";
                state.cartId = action.payload.id;
                state.items = action.payload.items || [];
            });
    },
});

export const {
    addToCart,
    increase,
    decrease,
    remove,
    toggleSelect,
    toggleSelectAll,
    resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;
