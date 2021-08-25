import { createReducer } from '@reduxjs/toolkit';

import { constants } from '../constants';

const initialState = {
  movieData: {},
  // actorsData: {},
};

export const appReducer = createReducer(initialState, {
  [constants.app.SET_MOVIE]: (state, action) => {
    state.movieData = action.payload;
  },
});
