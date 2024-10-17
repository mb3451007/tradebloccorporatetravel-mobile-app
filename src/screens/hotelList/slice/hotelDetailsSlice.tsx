/* eslint-disable prettier/prettier */
import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

// hotel state interface
export interface hotelDetailsData {
  hotelDetailsData: {
    data: {};
    statusCode: number;
    errMsg: string;
  };
  isLoading: boolean;
  err: string;
  hotelListNavData: {};
}

// hotel initial state
const initialState: hotelDetailsData = {
  hotelDetailsData: {
    data: {},
    statusCode: 0,
    errMsg: '',
  },
  isLoading: false,
  err: '',
  hotelListNavData: {},
};

// hotel slice
export const hotelDetailsSlice = createSlice({
  name: 'hotelDetails',
  initialState,
  reducers: {
    fetchhotelDetails: (state: hotelDetailsData) => {
      state.isLoading = true;
      state.err = '';
    },
    hotelDetailsSuccess: (
      state: hotelDetailsData,
      action: PayloadAction<any>,
    ) => {
      state.isLoading = false;
      state.hotelDetailsData = action.payload;
      state.err = '';
    },
    hotelDetailsFailure: (
      state: hotelDetailsData,
      action: PayloadAction<any>,
    ) => {
      state.isLoading = false;
      state.err = action.payload;
    },
    hotelListData: (state: hotelDetailsData, action: PayloadAction<any>) => {
      state.hotelListNavData = action.payload;
    },
    clearhotelDetailsData: (state: hotelDetailsData) => {
      state.hotelDetailsData = {
        data: {},
        errMsg: '',
        statusCode: 0,
      };
      state.err = '';
      state.isLoading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  fetchhotelDetails,
  hotelDetailsSuccess,
  hotelDetailsFailure,
  hotelListData,
  clearhotelDetailsData,
} = hotelDetailsSlice.actions;

// LocationSlice Reducer
export default hotelDetailsSlice.reducer;
