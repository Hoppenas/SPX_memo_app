import { createReducer } from '@reduxjs/toolkit';

import { constants } from '../constants';

export const INITIAL_STATE = {
  user: null,
  onSync: true,
  email: 'deafault1',
  movies: {},
};

const clearUserState = () => INITIAL_STATE;

export const userReducer = createReducer(INITIAL_STATE, {
  [constants.user.SET_USER]: (state, action) => {
    return { ...state, user: action.payload };
  },
  [constants.user.AUTH_SUCCESS]: (state, action) => {
    return { ...state, user: action.payload };
  },
  [constants.user.SET_ON_SYNC]: (state, action) => {
    return { ...state, onSync: action.payload };
  },
  [constants.user.SET_EMAIL]: (state, action) => {
    return { ...state, email: action.payload };
  },
  [constants.user.SET_Movies]: (state, action) => {
    return { ...state, movies: action.payload };
  },
  [constants.user.LOGOUT]: clearUserState,
});
