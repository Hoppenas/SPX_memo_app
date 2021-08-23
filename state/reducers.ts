import { messageReducer } from './messages/messageReducer';
import { combineReducers } from 'redux';

import { userReducer } from './user/userReducers';
import { uiReducer } from './ui/uiReducers';
import { appReducer } from './app/appReducers';
import { galleryReducer } from './gallery/galleryReducers';

const rootReducer = combineReducers({
  user: userReducer,
  ui: uiReducer,
  message: messageReducer,
  app: appReducer,
  gallery: galleryReducer,
});

export interface IPersistedAppState {
  _persist: { version: number; rehydrated: boolean };
}

export { rootReducer };
