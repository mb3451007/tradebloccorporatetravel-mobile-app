/* eslint-disable prettier/prettier */
import {PayloadAction, createSlice} from '@reduxjs/toolkit';

// Interface for the seat map.
interface seatMapState {
  response: any;
  isLoading: boolean;
  err: any;
  selectedSeats: any[];
}

// Initial state for the seat map.
const initialState: seatMapState = {
  response: [],
  err: '',
  isLoading: false,
  selectedSeats: [],
};

export const seatMapSlice = createSlice({
  name: 'seatmap',
  initialState: initialState,
  reducers: {
    fetchSeatMap: (state: seatMapState, _action: PayloadAction<any>) => {
      state.isLoading = true;
      state.err = '';
    },
    seatMapSuccess: (state: seatMapState, action: PayloadAction<any>) => {
      const {key, result} = action.payload;
      state.isLoading = false;
      state.err = '';
      state.response[`${key}`] = result;
    },
    seatMapFailure: (state: seatMapState, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.err = action.payload;
    },
    seatMapResponseMapping: (
      state: seatMapState,
      action: PayloadAction<any>,
    ) => {
      state.response = action.payload;
    },
    clearSeatMap: (state: seatMapState) => {
      state.response = {};
      state.isLoading = false;
      state.err = '';
    },
    selectedAllSeats: (state: seatMapState, action: PayloadAction<any>) => {
      state.selectedSeats = action.payload;
    },
  },
});

export const {
  fetchSeatMap,
  seatMapSuccess,
  seatMapFailure,
  seatMapResponseMapping,
  clearSeatMap,
  selectedAllSeats,
} = seatMapSlice.actions;

export default seatMapSlice.reducer;
