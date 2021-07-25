import { userReducer } from './user/userReducers';
import { uiReducer } from './ui/uiReducers';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  user: userReducer,
  ui: uiReducer,
});

export { rootReducer };
