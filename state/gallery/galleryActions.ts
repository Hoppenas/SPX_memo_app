import { constants } from '../constants';

const uploadImage = (
  imageUri: string,
  movieTitle: string,
  sceneTitle: string,
  actorId: string,
) => ({
  type: constants.gallery.UPLOAD_IMAGE,
  payload: { imageUri, movieTitle, sceneTitle, actorId },
});

const setGallery = (payload: any[]) => ({
  type: constants.gallery.SET_GALLERY,
  payload,
});

const deleteMovie = (movieTitle: string) => ({
  type: constants.gallery.DELETE_MOVIE,
  payload: { movieTitle },
});

const deleteScene = (movieTitle: string, sceneTitle: string) => ({
  type: constants.gallery.DELETE_SCENE,
  payload: { movieTitle, sceneTitle },
});

export const galleryActions = {
  uploadImage,
  setGallery,
  deleteMovie,
  deleteScene,
};
