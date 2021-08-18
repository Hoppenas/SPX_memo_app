// database()
//   .ref('Movies')
//   .on('value', snapshot => {
//     dispatch(actions.user.setMovies(snapshot.val()));
//   });

import { call, fork, put, take, takeEvery } from 'redux-saga/effects';
import database from '@react-native-firebase/database';

import { actions } from '../actions';
import { constants } from '../constants';

function* getMovies() {
  try {
    const db = database().ref('Movies');
    const data = yield db.on('value', snapshot => snapshot.val());
    yield put(actions.user.setMovies(data));
    // yield console.log('got data');
  } catch (error) {
    console.log(error);
  }
}

export default function* appSaga() {
  yield takeEvery(constants.app.GET_MOVIES, getMovies);
  // yield fork(watchUser);
}
