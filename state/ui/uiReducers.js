import {createReducer} from '@reduxjs/toolkit';

import {constants} from '../constants';

export const INITIAL_STATE = {
  isLoading: false,
};

export const uiReducer = createReducer(INITIAL_STATE, {
  [constants.ui.SET_LOADING]: (state, action) => {
    return {...state, isLoading: action.payload};
  },
});
