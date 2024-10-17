/* eslint-disable prettier/prettier */
import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

// hotel state interface
export interface roomRatesData {
  roomRatesData: {
    data: {};
    statusCode: number;
    errMsg: string;
  };
  isLoading: boolean;
  err: string;
}

// hotel initial state
const initialState: roomRatesData = {
  roomRatesData: {
    data: {},
    statusCode: 0,
    errMsg: '',
  },
  isLoading: false,
  err: '',
};

// hotel slice
export const roomRatesSlice = createSlice({
  name: 'roomRates',
  initialState,
  reducers: {
    fetchroomRates: (state: roomRatesData) => {
      state.isLoading = true;
      state.err = '';
    },
    roomRatesSuccess: (state: roomRatesData, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.roomRatesData = action.payload;
      state.err = '';
    },
    roomRatesFailure: (state: roomRatesData, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.err = action.payload;
    },
    clearroomRatesData: (state: roomRatesData) => {
      state.roomRatesData = {
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
export const {fetchroomRates, roomRatesSuccess, roomRatesFailure, clearroomRatesData} =
  roomRatesSlice.actions;

// LocationSlice Reducer
export default roomRatesSlice.reducer;
