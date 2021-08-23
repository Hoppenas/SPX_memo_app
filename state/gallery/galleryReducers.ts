import { createReducer } from '@reduxjs/toolkit';
import { constants } from '../constants';

const INITIAL_STATE: IGalleryReducerState = {
  gallery: null,
};
export interface IGalleryReducerState {
  gallery: any[] | null;
}
export const galleryReducer = createReducer(INITIAL_STATE, {
  [constants.gallery.SET_GALLERY]: (state, action) => {
    state.gallery = action.payload;
  },
});
