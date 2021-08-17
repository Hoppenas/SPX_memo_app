import { constants } from '../constants';

interface ILoginProps {
  email: string;
  password: string;
}

interface IregisterProps {
  email: string;
  password: string;
  passwordRepeat: string;
}
interface ISetUserProps {
  email: string;
  password: string;
  passwordConfirm?: string;
  name?: string;
  age?: string;
  location?: string;
}

const login = (values: ILoginProps) => ({
  type: constants.user.LOGIN,
  payload: values,
});

const logout = () => ({
  type: constants.user.LOGOUT,
});

const register = (values: IregisterProps) => ({
  type: constants.user.REGISTER,
  payload: values,
});

const setUser = (values: ISetUserProps) => ({
  type: constants.user.SET_USER,
  payload: values,
});

const setOnSync = payload => ({
  type: constants.user.SET_ON_SYNC,
  payload,
});

const setEmail = payload => ({
  type: constants.user.SET_EMAIL,
  payload,
});

const setMovies = payload => ({
  type: constants.user.SET_Movies,
  payload,
});

export const userActions = {
  login,
  logout,
  setUser,
  setOnSync,
  setEmail,
  setMovies,
};
