import { call, put, take, takeLatest, fork, select } from 'redux-saga/effects';
import { eventChannel, EventChannel, END } from 'redux-saga';
import i18n from 'i18next';
import { firebase } from '@react-native-firebase/database';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import { api } from '../../api/api';
import { actions } from '../actions';
import { constants } from '../constants';

interface IAction {
  type: string;
  payload: {
    imageUri: string;
    id?: string;
    movieTitle: string;
    sceneTitle: string;
  };
}

function* handleUploadImage(action: IAction) {
  try {
    const { imageUri, movieTitle, sceneTitle } = action.payload;
    const { task, url } = yield call(api.uploadImageToStorage, imageUri);
    const timeCreated: string = Date.parse(
      task.metadata.timeCreated,
    ).toString();
    const uid: string = yield select(state => state.user.user.uid);
    yield call(
      api.createGalleryItemInDatabase,
      url,
      timeCreated,
      uid,
      movieTitle,
      sceneTitle,
    );
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
      const galleryImagesArray = Object.values(galleryImages);
      yield put(actions.gallery.setGallery(galleryImagesArray));
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
