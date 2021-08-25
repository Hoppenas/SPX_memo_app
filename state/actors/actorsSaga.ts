import { call, fork, put, take, takeLatest } from 'redux-saga/effects';
import database from '@react-native-firebase/database';
import { eventChannel } from 'redux-saga';
import auth from '@react-native-firebase/auth';

import { actions } from '../actions';
import { constants } from '../constants';

function* getActors() {
  const db = database().ref('actors');
  try {
    const data = yield db.once('value', snapshot => snapshot.val());
    yield put(actions.actors.setActors(data.val()));
  } catch (error) {
    console.log(error);
  }
}

async function actorsChannel(uid: string) {
  const db = database().ref(`actors`);
  return eventChannel(emitter => {
    db.on('value', snapshot => {
      emitter({ data: snapshot.val() });
    });
    return () => db.off();
  });
}

function* watchActors() {
  const uid = auth().currentUser && auth().currentUser.uid;

  if (uid) {
    const channel: unknown = yield call(actorsChannel, uid);
    try {
      while (true) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { data } = yield take(channel as any);
        yield put(actions.actors.setActors(data));
      }
    } catch (e) {
      console.log(e);
    }
  }
}

export default function* actorsSaga() {
  yield takeLatest(constants.actors.GET_ACTORS, getActors);
  yield fork(watchActors);
}
