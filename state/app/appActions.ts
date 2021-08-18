import { constants } from '../constants';

interface ISelectionData {
  title: string;
}

const getMovies = () => ({
  type: constants.app.GET_MOVIES,
});

const setMovie = (data: ISelectionData[]) => ({
  type: constants.app.SET_MOVIE,
  payload: data,
});

export const appActions = {
  getMovies,
  setMovie,
};
