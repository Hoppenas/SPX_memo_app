import { createReducer } from '@reduxjs/toolkit';

import { constants } from '../constants';

const initialState = {
  actorsData: {},
};

export const actorsReducer = createReducer(initialState, {
  [constants.actors.SET_ACTORS]: (state, action) => {
    state.actorsData = action.payload;
  },
});
