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
    actorId: string;
    movieId: string;
  };
}

function* handleUploadImage(action: IAction) {
  try {
    const { imageUri, movieTitle, sceneTitle, actorId } = action.payload;
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
      actorId,
    );
  } catch (err) {
    console.log('error', err);
  } finally {
    // yield put(actions.ui.setLoading(false));
  }
}

function* handleUpdateActorProfilePhoto(action: IAction) {
  try {
    // yield put(actions.ui.setLoading(true));
    const { imageUri, actorId } = action.payload;
    const { task, url } = yield call(api.uploadImageToStorage, imageUri);
    const timeCreated: string = Date.parse(
      task.metadata.timeCreated,
    ).toString();
    const uid: string = yield select(state => state.user.user.uid);
    yield call(api.updateActorProfilePhoto, url, actorId);
  } catch (err) {
    console.log('error', err);
  } finally {
    // yield put(actions.ui.setLoading(false));
  }
}

function* handleUpdateMovieProfilePhoto(action: IAction) {
  try {
    // yield put(actions.ui.setLoading(true));
    const { imageUri, movieId } = action.payload;
    const { url } = yield call(api.uploadImageToStorage, imageUri);
    yield call(api.updateMovieProfilePhoto, url, movieId);
  } catch (err) {
    console.log('error', err);
  } finally {
    // yield put(actions.ui.setLoading(false));
  }
}

function* handleDeleteMovie(action: IAction) {
  try {
    const { movieTitle } = action.payload;
    yield put(actions.ui.setLoading(true));
    yield call(api.deleteMovie, movieTitle);
  } catch (err) {
    console.log('error', err);
  } finally {
    yield put(actions.ui.setLoading(false));
  }
}
function* handleDeleteScene(action: IAction) {
  try {
    const { movieTitle, sceneTitle } = action.payload;
    yield put(actions.ui.setLoading(true));
    yield call(api.deleteScene, movieTitle, sceneTitle);
  } catch (err) {
    console.log('error', err);
  } finally {
    yield put(actions.ui.setLoading(false));
  }
}

function* handleDeleteActorFromScene(action: IAction) {
  try {
    const { movieTitle, sceneTitle, actorId } = action.payload;
    yield put(actions.ui.setLoading(true));
    yield call(api.deleteActorFromScene, movieTitle, sceneTitle, actorId);
  } catch (err) {
    console.log('error', err);
  } finally {
    yield put(actions.ui.setLoading(false));
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
    }
  } catch (err) {
    console.log(err);
  }
}

export default function* gallerySagas() {
  yield takeLatest(constants.gallery.UPLOAD_IMAGE, handleUploadImage);
  yield takeLatest(constants.gallery.DELETE_MOVIE, handleDeleteMovie);
  yield takeLatest(constants.gallery.DELETE_SCENE, handleDeleteScene);
  yield takeLatest(
    constants.gallery.DELETE_ACTOR_FROM_SCENES,
    handleDeleteActorFromScene,
  );
  yield takeLatest(
    constants.gallery.UPDATE_ACTOR_PROFILE_PHOTO,
    handleUpdateActorProfilePhoto,
  );
  yield takeLatest(
    constants.gallery.UPDATE_MOVIE_PROFILE_PHOTO,
    handleUpdateMovieProfilePhoto,
  );
  yield fork(watchGallery);
}
