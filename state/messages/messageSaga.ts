import { put, takeLatest } from 'redux-saga/effects';

import { actions } from '../actions';
import { constants } from '../constants';

interface INermessageAction {
  type: string;
  payload: {
    text: string;
    type: string;
  };
}

function* newMsg(action: INermessageAction) {
  const {
    payload: { type, text },
  } = action;
  try {
    yield put(actions.message.setType(type));
    yield put(actions.message.setText(text));
    yield put(actions.message.setDisplay(true));
  } catch (e) {
    console.log(e);
  } finally {
  }
}

export default function* messageSaga() {
  yield takeLatest(constants.message.SET_NEW, newMsg);
}
