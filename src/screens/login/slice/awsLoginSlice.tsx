/* eslint-disable prettier/prettier */
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import appConstants from '@src/constants/appConstants';

export interface awsLoginState {
  awsResponse: any;
}

const initialState: awsLoginState = {
  awsResponse: {},
};

export const awsLoginSlice = createSlice({
  name: appConstants.awsLogin,
  initialState,
  reducers: {
    awsResponse: (state: awsLoginState, action: PayloadAction<any>) => {
      state.awsResponse = action.payload;
    },
    clearAwsResponse: (state: awsLoginState) => {
      state.awsResponse = {};
    },
  },
});

export const {awsResponse, clearAwsResponse} = awsLoginSlice.actions;
export default awsLoginSlice.reducer;
