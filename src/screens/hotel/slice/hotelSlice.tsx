/* eslint-disable prettier/prettier */
import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import appConstants from '@src/constants/appConstants';

// hotel state interface
export interface HotelState {
  hotelsData: {
    data: {};
    statusCode: number;
    errMsg: string;
  };
  isLoading: boolean;
  err: string;
  hotelDataToNav: {};
}

// hotel initial state
const initialState: HotelState = {
  hotelsData: {
    data: {},
    statusCode: 0,
    errMsg: '',
  },
  isLoading: false,
  err: '',
  hotelDataToNav: {},
};

// hotel slice
export const hotelsSlice = createSlice({
  name: appConstants.hotel,
  initialState,
  reducers: {
    fetchHotels: (state: HotelState, _action: PayloadAction<any>) => {
      state.isLoading = true;
      state.err = '';
    },
    hotelsSuccess: (state: HotelState, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.hotelsData = action.payload;
      state.err = '';
    },
    hotelsFailure: (state: HotelState, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.err = action.payload;
    },
    hotelData: (state: HotelState, action: PayloadAction<any>) => {
      state.hotelDataToNav = action.payload;
    },
    clearHotel: (state: HotelState) => {
      state.hotelsData = {
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
  fetchHotels,
  hotelsSuccess,
  hotelsFailure,
  clearHotel,
  hotelData,
} = hotelsSlice.actions;

// LocationSlice Reducer
export default hotelsSlice.reducer;
