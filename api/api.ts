import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/database';
import database from '@react-native-firebase/database';
import { useDispatch } from 'react-redux';

import { actions } from '../state/actions';

const login = async (email: string, password: string) =>
  auth().signInWithEmailAndPassword(email, password);

const logout = async () => auth().signOut();

const register = async (email: string, password: string) =>
  auth().createUserWithEmailAndPassword(email, password);

const getMovies = async () => {
  const dispatch = useDispatch();
  database()
    .ref('Movies')
    .on('value', snapshot => {
      dispatch(actions.user.setMovies(snapshot.val()));
    });
};

export const api = {
  login,
  logout,
  register,
  getMovies,
};
