/* eslint-disable prettier/prettier */
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import appConstants from '@src/constants/appConstants';
// oneWay search interface..
export interface oneWaySearchState {
  searchedData: {
    data: any;
    errMsg: string;
    statusCode: number;
  };
  oneWayStopsFilter: any;
  oneWayAirportFilter: any;
  oneWayLocationsFilter: any;
  oneWayPriceFilter: {
    min: number;
    max: number;
  };
  isLoading: boolean;
  err: string;
}

// oneWay initial state..
const initialState: oneWaySearchState = {
  searchedData: {
    data: {},
    errMsg: '',
    statusCode: 0,
  },
  oneWayStopsFilter: [],
  oneWayAirportFilter: [],
  oneWayLocationsFilter: [],
  oneWayPriceFilter: {
    min: 0,
    max: 0,
  },
  isLoading: false,
  err: '',
};

// slice
export const oneWayFlightSlice = createSlice({
  name: appConstants.oneWayFlightSearch,
  initialState,
  reducers: {
    fetchOneWayFlight: (state: oneWaySearchState) => {
      state.isLoading = true;
      state.err = '';
    },
    oneWaySuccess: (state: oneWaySearchState, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.searchedData = action.payload;
      state.err = '';
    },
    oneWayFailure: (state: oneWaySearchState, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.err = action.payload;
    },
    oneWayStopsFilter: (
      state: oneWaySearchState,
      action: PayloadAction<any>,
    ) => {
      state.oneWayStopsFilter = action.payload;
    },
    oneWayAirportFilter: (
      state: oneWaySearchState,
      action: PayloadAction<any>,
    ) => {
      state.oneWayAirportFilter = action.payload;
    },
    oneWayLocationsFilter: (
      state: oneWaySearchState,
      action: PayloadAction<any>,
    ) => {
      state.oneWayLocationsFilter = action.payload;
    },
    oneWayPriceFilter: (
      state: oneWaySearchState,
      action: PayloadAction<any>,
    ) => {
      state.oneWayPriceFilter = {
        min: action.payload.min,
        max: action.payload.max,
      };
    },
    clearOneWayFlight: (state: oneWaySearchState) => {
      state.isLoading = false;
      state.err = '';
      state.searchedData = {
        data: {},
        errMsg: '',
        statusCode: 0,
      };
    },
  },
});

// actions..
export const {
  fetchOneWayFlight,
  oneWaySuccess,
  oneWayFailure,
  clearOneWayFlight,
  oneWayStopsFilter,
  oneWayAirportFilter,
  oneWayLocationsFilter,
  oneWayPriceFilter,
} = oneWayFlightSlice.actions;

// reducers..
export default oneWayFlightSlice.reducer;
