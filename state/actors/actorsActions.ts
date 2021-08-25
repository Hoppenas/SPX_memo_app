import { constants } from '../constants';

const getActors = () => ({
  type: constants.actors.GET_ACTORS,
});

const setActors = payload => ({
  type: constants.actors.SET_ACTORS,
  payload,
});

export const actorsActions = {
  getActors,
  setActors,
};
