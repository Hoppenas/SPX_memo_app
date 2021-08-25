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

const uploadImage = (imageUri: string) => ({
  type: constants.app.UPLOAD_IMAGE,
  payload: { imageUri },
});

const getActors = () => ({
  type: constants.app.GET_ACTORS,
});

const setActors = payload => ({
  type: constants.app.SET_ACTORS,
  payload,
});

export const appActions = {
  getMovies,
  setMovie,
  uploadImage,
  getActors,
  setActors,
};
