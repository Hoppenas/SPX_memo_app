import { userReducer } from './user/userReducers';
import { uiReducer } from './ui/uiReducers';
import { messageReducer } from './messages/messageReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  user: userReducer,
  ui: uiReducer,
  message: messageReducer,
});

export interface IPersistedAppState {
  _persist: { version: number; rehydrated: boolean };
}

export { rootReducer };
