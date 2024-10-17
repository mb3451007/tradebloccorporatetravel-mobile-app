/* eslint-disable prettier/prettier */
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import appConstants from '@src/constants/appConstants';
// oneWay search interface..
export interface roundTripSearchState {
  searchedRoundTripData: {
    data: any;
    errMsg: string;
    statusCode: number;
  };
  roundTripStopsFilter: any;
  roundTripAirportFilter: any;
  roundTripLocationsFilter: any;
  roundTripPriceFilter: {
    min: number;
    max: number;
  };
  isLoading: boolean;
  err: string;
}

// oneWay initial state..
const initialState: roundTripSearchState = {
  searchedRoundTripData: {
    data: {},
    errMsg: '',
    statusCode: 0,
  },
  roundTripStopsFilter: [],
  roundTripAirportFilter: [],
  roundTripLocationsFilter: [],
  roundTripPriceFilter: {
    min: 0,
    max: 0,
  },
  isLoading: false,
  err: '',
};

// slice
export const roundTripFlightSlice = createSlice({
  name: appConstants.roundTripFlightSearch,
  initialState,
  reducers: {
    fetchRoundTripFlight: (state: roundTripSearchState) => {
      state.isLoading = true;
      state.err = '';
    },
    roundTripSuccess: (
      state: roundTripSearchState,
      action: PayloadAction<any>,
    ) => {
      state.isLoading = false;
      state.searchedRoundTripData = action.payload;
      state.err = '';
    },
    roundTripFailure: (
      state: roundTripSearchState,
      action: PayloadAction<any>,
    ) => {
      state.isLoading = false;
      state.err = action.payload;
    },
    clearRoundTrip: (state: roundTripSearchState) => {
      state.isLoading = false;
      state.err = '';
      state.searchedRoundTripData = {
        data: {},
        errMsg: '',
        statusCode: 0,
      };
    },
    roundTripStopsFilter: (
      state: roundTripSearchState,
      action: PayloadAction<any>,
    ) => {
      state.roundTripStopsFilter = action.payload;
    },
    roundTripAirportFilter: (
      state: roundTripSearchState,
      action: PayloadAction<any>,
    ) => {
      state.roundTripAirportFilter = action.payload;
    },
    roundTripLocationsFilter: (
      state: roundTripSearchState,
      action: PayloadAction<any>,
    ) => {
      state.roundTripLocationsFilter = action.payload;
    },
    roundTripPriceFilter: (
      state: roundTripSearchState,
      action: PayloadAction<any>,
    ) => {
      state.roundTripPriceFilter = {
        min: action.payload.min,
        max: action.payload.max,
      };
    },
  },
});

// actions..
export const {
  fetchRoundTripFlight,
  roundTripSuccess,
  roundTripFailure,
  clearRoundTrip,
  roundTripStopsFilter,
  roundTripAirportFilter,
  roundTripLocationsFilter,
  roundTripPriceFilter,
} = roundTripFlightSlice.actions;

// reducers..
export default roundTripFlightSlice.reducer;
