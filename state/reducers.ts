import { userReducer } from './user/userReducers';
import { uiReducer } from './ui/uiReducers';
import { messageReducer } from './messages/messageReducer';
import { appReducer } from './app/appReducers';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  user: userReducer,
  ui: uiReducer,
  message: messageReducer,
  app: appReducer,
});

export interface IPersistedAppState {
  _persist: { version: number; rehydrated: boolean };
}

export { rootReducer };
