// database()
//   .ref('Movies')
//   .on('value', snapshot => {
//     dispatch(actions.user.setMovies(snapshot.val()));
//   });

import { call, fork, put, take, takeEvery } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import auth from '@react-native-firebase/auth';
import i18n from 'i18next';
import { ISelectionData } from 'src/types/selectionListType';

import { api, database } from '../../api/api';
import { actions } from '../actions';
import { constants } from '../constants';

function* getData() {
  try {
    const db = database.ref('Movies');
    const data: ISelectionData[] = yield db
      .on('value')
      .then(snapshot => snapshot.val());
    yield put(actions.user.setMovies(data));
  } catch (error) {
    console.log(error);
  }
}

export default function* appSaga() {
  yield takeEvery(constants.app.GET_MOVIE_DATA, getData);
  // yield fork(watchUser);
}
