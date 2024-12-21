import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: localStorage.getItem('currentUser') || null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.currentUser = action.payload;
            localStorage.setItem('currentUser', action.payload);
        },
        logout: (state) => {
            state.currentUser = null;
            localStorage.removeItem('currentUser');
        },
        register: (state, action) => {
            const users = JSON.parse(localStorage.getItem('users')) || {};
            users[action.payload.username] = action.payload.password;
            localStorage.setItem('users', JSON.stringify(users));
        },
    },
});

export const { login, logout, register } = userSlice.actions;
export default userSlice.reducer;