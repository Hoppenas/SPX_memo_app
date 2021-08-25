import { all, fork } from 'redux-saga/effects';

import userSaga from './user/userSaga';
import messageSaga from './messages/messageSaga';
import appSaga from './app/appSaga';
import gallerySagas from './gallery/gallerySaga';
import actorsSaga from './actors/actorsSaga';

export function* rootSaga() {
  yield all([
    fork(userSaga),
    fork(messageSaga),
    fork(appSaga),
    fork(gallerySagas),
    fork(actorsSaga),
  ]);
}
