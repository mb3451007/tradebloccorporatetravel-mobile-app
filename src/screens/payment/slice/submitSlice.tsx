/* eslint-disable prettier/prettier */
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import appConstants from '@src/constants/appConstants';

interface submitState {
  resposne: any;
  err: any;
  isLoading: boolean;
}

const initialState: submitState = {
  resposne: {},
  err: '',
  isLoading: false,
};

export const submitSlice = createSlice({
  name: appConstants.submit,
  initialState,
  reducers: {
    sendSubmit: (state: submitState) => {
      state.isLoading = true;
      state.err = '';
    },
    submitSuccessful: (state: submitState, action: PayloadAction<any>) => {
      state.resposne = action.payload;
      state.isLoading = false;
      state.err = '';
    },
    submitFailure: (state: submitState, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.err = action.payload;
    },
    clearSubmit: (state: submitState) => {
      state.resposne = {};
      state.err = '';
      state.isLoading = false;
    },
  },
});

export const {sendSubmit, submitSuccessful, submitFailure, clearSubmit} =
  submitSlice.actions;
export default submitSlice.reducer;
