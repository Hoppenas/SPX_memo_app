import { createReducer } from '@reduxjs/toolkit';

import { constants } from '../constants';

export interface IMessageReducer {
  display: boolean;
  text: string;
  type: string;
}

export const INITIAL_STATE: IMessageReducer = {
  display: false,
  text: '',
  type: '',
};

export const messageReducer = createReducer(INITIAL_STATE, {
  [constants.message.SET_DISPLAY]: (state, action) => {
    state.display = action.payload;
  },
  [constants.message.SET_TEXT]: (state, action) => {
    state.text = action.payload;
  },
  [constants.message.SET_TYPE]: (state, action) => {
    state.type = action.payload;
  },
  [constants.message.CLEAR]: state => {
    state.display = false;
    state.text = '';
    state.type = '';
  },
});
