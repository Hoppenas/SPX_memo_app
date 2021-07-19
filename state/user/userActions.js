import {constants} from '../constants';

const setUser = payload => ({
  type: constants.user.SET_USER,
  payload,
});

const setOnSync = payload => ({
  type: constants.user.SET_ON_SYNC,
  payload,
});

export const userActions = {
  setUser,
  setOnSync,
};
