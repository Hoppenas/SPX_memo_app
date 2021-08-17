import { call, fork, put, take, takeEvery } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/database';

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
  try {
    yield put(actions.ui.setLoading(true));
    const response: IFirebaseAuth = yield call(
      api.register,
      action.payload.email,
      action.payload.password,
    );
    yield call(
      api.createUser,
      response.user.uid,
      action.payload.name,
      action.payload.age,
      action.payload.location,
      currentDate(),
    );
    yield put(
      actions.ui.setGlobalMessage('success', i18n.t('success:registration')),
    );
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      yield put(
        actions.ui.setGlobalMessage('error', i18n.t('errors:fbTakenEmail')),
      );
    } else {
      yield put(actions.ui.setGlobalMessage('error', error.message));
    }
  } finally {
    yield put(actions.ui.setLoading(false));
    yield fork(watchUser);
  }
}

export default function* userSaga() {
  yield takeEvery(constants.user.LOGIN, login);
  yield takeEvery(constants.user.LOGOUT, logout);
}
