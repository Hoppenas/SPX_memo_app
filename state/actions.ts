import { userActions } from './user/userActions';
import { uiActions } from './ui/uiActions';
import { messageActions } from './messages/messageActions';

export const actions = {
  user: userActions,
  ui: uiActions,
  message: messageActions,
};
