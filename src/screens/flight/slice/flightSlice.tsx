/* eslint-disable prettier/prettier */
import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import appConstants from '@src/constants/appConstants';

// Location state interface
export interface HomeState {
  locationsData: any[];
  isLoading: boolean;
  err: string;
}

// Location initial state
const initialState: HomeState = {
  locationsData: [],
  isLoading: false,
  err: '',
};

// Location slice
export const flightSlice = createSlice({
  name: appConstants.locations,
  initialState,
  reducers: {
    fetchLocations: (state: HomeState) => {
      state.isLoading = true;
      state.err = '';
    },
    locationsSuccess: (state: HomeState, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.locationsData = action.payload.data;

      state.err = '';
    },
    locationsFailure: (state: HomeState, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.err = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {fetchLocations, locationsSuccess, locationsFailure} =
  flightSlice.actions;

// LocationSlice Reducer
export default flightSlice.reducer;
