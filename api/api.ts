import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/database';

const login = async (email: string, password: string) =>
  auth().signInWithEmailAndPassword(email, password);

const logout = async () => auth().signOut();

const register = async (email: string, password: string) =>
  auth().createUserWithEmailAndPassword(email, password);

export const api = {
  login,
  logout,
  register,
};
