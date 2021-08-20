// database()
//   .ref('Movies')
//   .on('value', snapshot => {
//     dispatch(actions.user.setMovies(snapshot.val()));
//   });

import {
  call,
  fork,
  put,
  take,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';
import database from '@react-native-firebase/database';
import { eventChannel } from 'redux-saga';
import auth from '@react-native-firebase/auth';

import { actions } from '../actions';
import { constants } from '../constants';
import { api } from '../../api/api';

async function usersChannel(uid: string) {
  const db = database().ref(`Movies`);
  return eventChannel(emitter => {
    db.on('value', snapshot => {
      emitter({ data: snapshot.val() });
    });
    return () => db.off();
  });
}

function* watchUser() {
  const uid = auth().currentUser && auth().currentUser.uid;

  if (uid) {
    const channel: unknown = yield call(usersChannel, uid);
    try {
      while (true) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { data } = yield take(channel as any);
        yield put(actions.app.setMovie(data));
      }
    } catch (e) {
      console.log(e);
    }
  }
}

function* getMovies() {
  const db = database().ref('Movies');
  try {
    // console.log('got data');
    const data = yield db.once('value', snapshot => snapshot.val());
    // yield console.log(data);
    // const data = yield db.once('value', snapshot => snapshot.val());
    yield put(actions.app.setMovie(data.val()));
  } catch (error) {
    console.log(error);
  }
}

export default function* appSaga() {
  yield takeLatest(constants.app.GET_MOVIES, getMovies);
  yield fork(watchUser);
}
