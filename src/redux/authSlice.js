import {createSlice} from '@reduxjs/toolkit';

// ktra user từ cả session va local storage khi load trang
const getStoredUser = () => {
    const localUser = localStorage.getItem('currentUser');
    const sessionUser = sessionStorage.getItem('currentUser');
    return localUser ? JSON.parse(localUser) : (sessionUser ? JSON.parse(sessionUser) : null);
};
const storedUser = getStoredUser();
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: storedUser || null,
        isLogin: storedUser ? true : false,
    },
    reducers: {
        login: (state, action) => {
            const { user, rememberMe } = action.payload;
            state.user = user;
            state.isLogin = true;
            const userData = JSON.stringify(user);
            if (rememberMe) {
                localStorage.setItem('currentUser', userData);
                sessionStorage.removeItem('currentUser');
            } else {
                sessionStorage.setItem('currentUser', userData);
                localStorage.removeItem('currentUser');
            }
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
            const userData = JSON.stringify(updatedData);
            if (localStorage.getItem('currentUser')) {
                localStorage.setItem('currentUser', userData);
            } else {
                sessionStorage.setItem('currentUser', userData);
            }
        }
    },
});

export const {login, logout, update} = authSlice.actions;
export default authSlice.reducer;