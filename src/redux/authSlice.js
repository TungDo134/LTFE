import {createSlice} from '@reduxjs/toolkit';

const storedUser = JSON.parse(localStorage.getItem('currentUser'));
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: storedUser || null,
        isLogin: storedUser ? true : false,
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
            state.isLogin = true;
            localStorage.setItem('currentUser', JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.user = null;
            state.isLogin = false;
            localStorage.removeItem('currentUser');
        },
        update: (state, action) => {
            const updatedData  = {...state.user, ...action.payload};
            delete updatedData.pwd;
            state.user = updatedData;
            localStorage.setItem('currentUser', JSON.stringify(updatedData));
        }
    },
});

export const {login, logout, update} = authSlice.actions;
export default authSlice.reducer;