import { constants } from '../constants';

const uploadImage = (
  imageUri: string,
  movieTitle: string,
  sceneTitle: string,
) => ({
  type: constants.gallery.UPLOAD_IMAGE,
  payload: { imageUri, movieTitle, sceneTitle },
});

const setGallery = (payload: any[]) => ({
  type: constants.gallery.SET_GALLERY,
  payload,
});

export const galleryActions = {
  uploadImage,
  setGallery,
};
