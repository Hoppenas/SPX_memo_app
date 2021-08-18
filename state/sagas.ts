import { all, fork } from 'redux-saga/effects';

import userSaga from './user/userSaga';
import messageSaga from './messages/messageSaga';
import appSaga from './app/appSaga';

export function* rootSaga() {
  yield all([fork(userSaga), fork(messageSaga), fork(appSaga)]);
}
