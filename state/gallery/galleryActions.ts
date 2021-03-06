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

const updateActorProfilePhoto = (imageUri: string, actorId: string) => ({
  type: constants.gallery.UPDATE_ACTOR_PROFILE_PHOTO,
  payload: { imageUri, actorId },
});

const uploadMovieProfilePic = (imageUri: string, movieId: string) => ({
  type: constants.gallery.UPDATE_MOVIE_PROFILE_PHOTO,
  payload: { imageUri, movieId },
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

const deleteActorFromScene = (
  movieTitle: string,
  sceneTitle: string,
  actorId: string,
) => ({
  type: constants.gallery.DELETE_ACTOR_FROM_SCENES,
  payload: { movieTitle, sceneTitle, actorId },
});

export const galleryActions = {
  uploadImage,
  setGallery,
  deleteMovie,
  deleteScene,
  deleteActorFromScene,
  updateActorProfilePhoto,
  uploadMovieProfilePic,
};
