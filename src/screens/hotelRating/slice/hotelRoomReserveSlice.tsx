/* eslint-disable prettier/prettier */
import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

// hotel state interface
export interface roomReserveData {
  roomReserveData: {
    data: {};
    statusCode: number;
    errMsg: string;
  };
  isLoading: boolean;
  err: string;
  hotelRoomData:{},
}

// hotel initial state
const initialState: roomReserveData = {
  roomReserveData: {
    data: {},
    statusCode: 0,
    errMsg: '',
  },
  isLoading: false,
  err: '',
  hotelRoomData:{},
};

// hotel slice
export const roomReserveSlice = createSlice({
  name: 'roomReserve',
  initialState,
  reducers: {
    fetchroomReserve: (state: roomReserveData,_action:PayloadAction<any>) => {
      state.isLoading = true;
      state.err = '';
    },
    roomReserveSuccess: (state: roomReserveData, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.roomReserveData = action.payload;
      state.err = '';
    },
    roomReserveFailure: (state: roomReserveData, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.err = action.payload;
    },
    hotelRoomReserveData : (state: roomReserveData, action: PayloadAction<any>) => {
      state.hotelRoomData = action.payload;
    },
    clearroomReserveData: (state: roomReserveData) => {
      state.roomReserveData = {
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
export const {fetchroomReserve, roomReserveSuccess, roomReserveFailure, clearroomReserveData,hotelRoomReserveData} =
roomReserveSlice.actions;

// LocationSlice Reducer
export default roomReserveSlice.reducer;
