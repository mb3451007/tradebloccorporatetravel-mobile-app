/* eslint-disable prettier/prettier */
import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import appConstants from '@src/constants/appConstants';

// Location state interface
export interface nationalityState {
  nationalityData: any[];
  isLoading: boolean;
  err: string;
}

// Location initial state
const initialState: nationalityState = {
  nationalityData: [],
  isLoading: false,
  err: '',
};

// Location slice
export const nationalitySlice = createSlice({
  name: appConstants.nationality,
  initialState,
  reducers: {
    fetchNationality: (state: nationalityState) => {
      state.isLoading = true;
      state.err = '';
    },
    nationalitySuccess: (
      state: nationalityState,
      action: PayloadAction<any>,
    ) => {
      state.isLoading = false;
      state.nationalityData = action.payload;
      state.err = '';
    },
    nationalityFailure: (
      state: nationalityState,
      action: PayloadAction<any>,
    ) => {
      state.isLoading = false;
      state.err = action.payload;
    },
    clearNationality: (state: nationalityState) => {
      state.nationalityData = [];
      state.isLoading = false;
      state.err = '';
    },
  },
});

// Action creators are generated for each case reducer function
export const {fetchNationality, nationalitySuccess, nationalityFailure,clearNationality} =
  nationalitySlice.actions;

// LocationSlice Reducer
export default nationalitySlice.reducer;
