import { constants } from '../constants';

const uploadImage = (imageUri: string) => ({
  type: constants.gallery.UPLOAD_IMAGE,
  payload: { imageUri },
});

// const setGallery = (payload: any[]) => ({
//   type: constants.gallery.setGallery,
//   payload,
// });

export const galleryActions = {
  uploadImage,
  //   setGallery,
};
