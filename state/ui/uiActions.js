import { constants } from '../constants';

const setLoading = payload => ({
  type: constants.ui.SET_LOADING,
  payload,
});

export const uiActions = {
  setLoading,
};
