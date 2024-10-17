/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// login interface
export interface loginState {
    loginData: '',
    isLoading: boolean,
    err: string,
}

// login initialstate
const initialState: loginState = {
    loginData: '',
    isLoading: false,
    err: '',
};

// login slice
export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        fetchLogin: (state: loginState,_action: PayloadAction<any>) => {
            state.isLoading = true;
            state.err = '';
        },
        loginSuccess: (state: loginState, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.loginData = action.payload;
            state.err = '';
        },
        loginFailure: (state: loginState, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.err = action.payload;
        },
        loginGuest:(state:loginState,action:PayloadAction<any>) => {
            state.loginData = action.payload;
            state.err = '';
            state.isLoading = false;
        },
        clearLoginData:(state:loginState) => {
            state.isLoading = false;
            state.err = '';
            state.loginData = '';
        },
        customLoggedIn:(state: loginState, action:PayloadAction<any>) => {
            state.loginData = action.payload;
            state.err = '';
            state.isLoading = false;
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    fetchLogin,
    loginSuccess,
    loginFailure,
    loginGuest,
    clearLoginData,
    customLoggedIn,
} = loginSlice.actions;


// loginSlice Reducer
export default loginSlice.reducer;
