import { constants } from '../constants';

const setDisplay = (payload: boolean) => ({
  type: constants.message.SET_DISPLAY,
  payload,
});

const setText = (payload: string) => ({
  type: constants.message.SET_TEXT,
  payload,
});

interface ISetNew {
  type: string;
  payload: {
    text: string;
    type: string;
  };
}

const setNew = (payload: { text: string; type: string }): ISetNew => ({
  type: constants.message.SET_NEW,
  payload,
});

const setType = (payload: string) => ({
  type: constants.message.SET_TYPE,
  payload,
});

const clear = () => ({
  type: constants.message.CLEAR,
});

export const messageActions = {
  setDisplay,
  setText,
  setNew,
  setType,
  clear,
};
