import { createSlice } from '@reduxjs/toolkit';
import { register, logIn, logOut } from './auth-operations';

const initialState = {
    user: { name: '', email: '' },
    uid: null,
    isLoggedIn: false,
    loading: false,
};


const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(register.fulfilled, (state, { payload }) => {
                state.user = payload.user;
                state.uid = payload.uid;
                state.isLoggedIn = true;
                state.loading = true;
            })
            .addCase(logIn.fulfilled, (state, { payload }) => {
                state.user = payload.user;
                state.uid = payload.uid;
                state.isLoggedIn = true;
                state.loading = true;
            })
            .addCase(logOut.fulfilled, (state) => {
                state.user = { name: '', email: '' };
                state.uid = '';
                state.isLoggedIn = false;
                state.loading = true;
            });
    },
});

export const authReducer = authSlice.reducer;