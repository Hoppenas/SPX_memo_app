import { call, put, take, takeLatest, fork, select } from 'redux-saga/effects';
import { eventChannel, EventChannel, END } from 'redux-saga';
import i18n from 'i18next';
import { firebase } from '@react-native-firebase/database';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import { api } from '../../api/api';
import { actions } from '../actions';
import { constants } from '../constants';

// const database = firebase
//   .app()
//   .database(
//     'https://happyeyesapp-default-rtdb.europe-west1.firebasedatabase.app/',
//   );

interface IAction {
  type: string;
  payload: {
    imageUri: string;
    id?: string;
  };
}

function* handleUploadImage(action: IAction) {
  try {
    const { imageUri } = action.payload;
    // yield put(actions.ui.setLoading(true));
    // Upload image to firebase storage
    yield call(api.uploadImageToStorage, imageUri);
  } catch (err) {
    console.log('error', err);
  } finally {
    // yield put(actions.ui.setLoading(false));
  }
}

async function galleryEventChannel() {
  return eventChannel(emit => {
    const db = database().ref('gallery');
    db.on('value', snapshot => {
      emit({ galleryImages: snapshot.val() });
    });
    return () => db.off();
  });
}

function* watchGallery() {
  try {
    const channel: EventChannel<unknown> = yield call(galleryEventChannel);
    while (true) {
      const { galleryImages } = yield take(channel as any);
      // console.log(' from channel-->', galleryImages);
      const galleryImagesArray = Object.values(galleryImages);
      //   yield put(actions.gallery.setGallery(galleryImagesArray));
      yield console.log(galleryImagesArray);
    }
  } catch (err) {
    console.log(err);
  }
}

export default function* gallerySagas() {
  yield takeLatest(constants.gallery.UPLOAD_IMAGE, handleUploadImage);
  yield fork(watchGallery);
}