/* eslint-disable prettier/prettier */
import {createSlice} from '@reduxjs/toolkit';
import {PayloadAction} from '@reduxjs/toolkit';
import appConstants from '@src/constants/appConstants';

// Location state interface
export interface appState {
  selectedTab: number;
  sorting: string;
  open: boolean;
  filter: {
    stops: [];
    duration: {min: number; max: number};
    price: {min: number; max: number};
    locations: [];
    carriers: [];
    type: [];
    filter: boolean;
    oneWayDepartureTime: {min: any; max: any};
    oneWayArrivalTime: {min: any; max: any};
    inBoundDepartureTime: {
      min: any;
      max: any;
    };
    inBoundArrivalTime: {
      min: any;
      max: any;
    };
    outBoundDepartureTime: {
      min: any;
      max: any;
    };
    outBoundArrivalTime: {
      min: any;
      max: any;
    };
  };
  checkoutData: any;
}

// Location initial state
const initialState: appState = {
  selectedTab: 1,
  sorting: appConstants.cheapest,
  open: true,
  filter: {
    stops: [],
    duration: {
      min: NaN,
      max: NaN,
    },
    price: {
      min: NaN,
      max: NaN,
    },
    locations: [],
    carriers: [],
    type: [],
    filter: false,
    oneWayDepartureTime: {
      min: 0,
      max: 0,
    },
    oneWayArrivalTime: {min: 0, max: 0},
    inBoundDepartureTime: {
      min: 0,
      max: 0,
    },
    inBoundArrivalTime: {
      min: 0,
      max: 0,
    },
    outBoundDepartureTime: {
      min: 0,
      max: 0,
    },
    outBoundArrivalTime: {
      min: 0,
      max: 0,
    },
  },
  checkoutData: {},
};

// Location slice
export const appSlice = createSlice({
  name: appConstants.appSlice,
  initialState,
  reducers: {
    currentTabSelected: (state: appState, action: PayloadAction<any>) => {
      state.selectedTab = action.payload;
    },
    currentSorting: (state: appState, action: PayloadAction<any>) => {
      state.sorting = action.payload;
    },
    currentFilter: (state: appState, action: PayloadAction<any>) => {
      state.filter = {
        stops: action.payload.stops,
        carriers: action.payload.carriers,
        duration: {
          min: action.payload.duration.min,
          max: action.payload.duration.max,
        },
        price: {
          min: action.payload.price.min,
          max: action.payload.price.max,
        },
        locations: action.payload.locations,
        type: [],
        filter: action.payload.filter,
        oneWayDepartureTime: {
          min: action.payload.oneWayDepartureTime?.min,
          max: action.payload.oneWayDepartureTime?.max,
        },
        oneWayArrivalTime: {
          min: action.payload.oneWayArrivalTime.min,
          max: action.payload.oneWayArrivalTime.max,
        },
        inBoundDepartureTime: {
          min: action.payload.inBoundDepartureTime?.min,
          max: action.payload.inBoundDepartureTime?.max,
        },
        inBoundArrivalTime: {
          min: action.payload.inBoundArrivalTime?.min,
          max: action.payload.inBoundArrivalTime?.max,
        },
        outBoundDepartureTime: {
          min: action.payload.outBoundDepartureTime?.min,
          max: action.payload.outBoundDepartureTime?.max,
        },
        outBoundArrivalTime: {
          min: action.payload.outBoundArrivalTime?.min,
          max: action.payload.outBoundArrivalTime?.max,
        },
      };
    },
    openedFilter: (state: appState, action: PayloadAction<any>) => {
      state.open = action.payload;
    },
    clearFilter: (state: appState) => {
      state.filter = initialState.filter;
    },
    checkoutScreenData: (state: appState, action: PayloadAction<any>) => {
      state.checkoutData = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  currentTabSelected,
  currentSorting,
  currentFilter,
  clearFilter,
  openedFilter,
  checkoutScreenData,
} = appSlice.actions;

// LocationSlice Reducer
export default appSlice.reducer;
