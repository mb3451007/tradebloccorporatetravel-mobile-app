/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// SignUp interface
export interface SignUpState {
    signUpData: any[],
    isLoading: boolean,
    err: string,
}

// SignUp initialstate..
const initialState: SignUpState = {
    signUpData: [],
    isLoading: false,
    err: '',
};

// SignUp Slice..
export const signUpSlice = createSlice({
    name: 'signUp',
    initialState,
    reducers: {
        fetchSignUp: (state: SignUpState) => {
            state.isLoading = true;
            state.err = '';
        },
        signUpSuccess: (state: SignUpState, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.signUpData = action.payload;
            state.err = '';
        },
        signUpFailure: (state: SignUpState, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.err = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    fetchSignUp,
    signUpSuccess,
    signUpFailure,
} = signUpSlice.actions;


// SignUp Slice Reducer
export default signUpSlice.reducer;
