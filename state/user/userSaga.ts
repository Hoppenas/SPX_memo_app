import { call, fork, put, take, takeEvery } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/database';
import database from '@react-native-firebase/database';
import { useTranslation } from 'react-i18next';

import { api } from '../../api/api';
import { actions } from '../actions';
import { constants } from '../constants';
import { IFirebaseAuth } from '../../types/userAuthTypes';
interface IAction {
  type: string;
  email?: string;
  password?: string;
  repeatPassword?: string;
  uid?: string;
  payload: { email: string; password: string };
}

function* login(action: IAction) {
  try {
    yield put(actions.ui.setLoading(true));
    yield call(api.login, action.payload.email, action.payload.password);
  } catch (e) {
    yield put(actions.message.setNew({ text: e.code, type: 'error' }));
  } finally {
    yield put(actions.ui.setLoading(false));
  }
}

function* logout() {
  try {
    yield put(actions.ui.setLoading(true));
    yield call(api.logout);
    yield put(actions.user.logout());
  } catch (error) {
    console.log(error.message);
  } finally {
    yield put(actions.ui.setLoading(false));
  }
}

function* handleRegistration(action: {
  payload: {
    email: string;
    password: string;
    passwordRepeat: string;
  };
  type: string;
}) {
  const { t } = useTranslation();
  try {
    yield put(actions.ui.setLoading(true));
    const response: IFirebaseAuth = yield call(
      api.register,
      action.payload.email,
      action.payload.password,
    );
    yield put(actions.message.setNew(t('messages:successfullRegistration')));
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      yield put(actions.message.setNew(t('errors:emailInUse')));
    } else {
      yield put(actions.message.setNew(error.message));
    }
  } finally {
    yield put(actions.ui.setLoading(false));
    yield fork(watchUser);
  }
}

async function usersChannel(uid: string) {
  const db = database().ref(`/users/${uid}`);
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
        const { data } = yield take(channel as any);
        yield put(actions.user.setData(data));
      }
    } catch (e) {
      console.log(e);
    }
  }
}

export default function* userSaga() {
  yield takeEvery(constants.user.LOGIN, login);
  yield takeEvery(constants.user.LOGOUT, logout);
  yield takeEvery(constants.user.REGISTER, handleRegistration);
  yield fork(watchUser);
}
