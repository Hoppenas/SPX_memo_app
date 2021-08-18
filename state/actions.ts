import { userActions } from './user/userActions';
import { uiActions } from './ui/uiActions';
import { messageActions } from './messages/messageActions';
import { appActions } from './app/appActions';

export const actions = {
  user: userActions,
  ui: uiActions,
  message: messageActions,
  app: appActions,
};
