/* eslint-disable prettier/prettier */
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import appConstants from '@src/constants/appConstants';

// Interface for oneway checkout
interface CheckoutState {
  searchedData: {
    data: any;
    errMsg: any;
    statusCode: any;
  };
  isLoading: boolean;
  err: any;
  passengars: [{adult: number}, {child: number}, {infant: number}];
}

// Oneway initial state
const initialState: CheckoutState = {
  searchedData: {
    data: {},
    errMsg: '',
    statusCode: 0,
  },
  isLoading: false,
  err: '',
  passengars: [{adult: 1}, {child: 0}, {infant: 0}],
};

// Oneway checkout slice
export const checkoutSlice = createSlice({
  name: appConstants.checkout,
  initialState: initialState,
  reducers: {
    fetchCheckout: (state: CheckoutState) => {
      state.isLoading = true;
      state.err = '';
    },
    checkoutSuccess: (state: CheckoutState, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.searchedData = action.payload;
      state.err = '';
    },
    checkoutFailure: (state: CheckoutState, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.err = action.payload;
    },
    passengerCount: (state: CheckoutState, action: PayloadAction<any>) => {
      state.passengars = action.payload;
    },
    clearCheckout: (state: CheckoutState) => {
      state.err = '';
      state.isLoading = false;
      state.searchedData = {
        data: {},
        errMsg: '',
        statusCode: 0,
      };
      state.passengars = [{adult: 1}, {child: 0}, {infant: 0}];
    },
  },
});

// Exporting the actions
export const {
  fetchCheckout,
  checkoutSuccess,
  checkoutFailure,
  clearCheckout,
  passengerCount,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
