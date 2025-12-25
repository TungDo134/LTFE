import { createSlice } from '@reduxjs/toolkit';

const storedUser = JSON.parse(localStorage.getItem('currentUser'));
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: storedUser || null,
        isLoggedIn: storedUser ? true : false,
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
            state.isLoggedIn = true;
            localStorage.setItem('currentUser', JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.user = null;
            state.isLoggedIn = false;
            localStorage.removeItem('currentUser');
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;