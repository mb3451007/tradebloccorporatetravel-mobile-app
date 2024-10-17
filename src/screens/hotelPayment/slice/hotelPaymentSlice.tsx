/* eslint-disable prettier/prettier */
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import appConstants from '@src/constants/appConstants';

interface hotelPaymentState {
  response: any;
  err: any;
  isLoading: boolean;
}

const initialState: hotelPaymentState = {
  response: {},
  err: '',
  isLoading: false,
};

export const hotelPaymentSlice = createSlice({
  name: appConstants.hotelPayment,
  initialState,
  reducers: {
    sendhotelPayment: (state: hotelPaymentState) => {
      state.isLoading = true;
      state.err = '';
    },
    hotelPaymentSuccessful: (state: hotelPaymentState, action: PayloadAction<any>) => {
      state.response = action.payload;
      state.isLoading = false;
      state.err = '';
    },
    hotelPaymentFailure: (state: hotelPaymentState, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.err = action.payload;
    },
    clearhotelPayment: (state: hotelPaymentState) => {
      state.response = {};
      state.err = '';
      state.isLoading = false;
    },
  },
});

export const {sendhotelPayment, hotelPaymentSuccessful, hotelPaymentFailure, clearhotelPayment} =
hotelPaymentSlice.actions;
export default hotelPaymentSlice.reducer;
