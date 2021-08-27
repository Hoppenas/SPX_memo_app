import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/database';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import { useDispatch } from 'react-redux';
import ImageResizer from 'react-native-image-resizer';

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

const getActors = async () => {
  const dispatch = useDispatch();
  database()
    .ref('actors')
    .on('value', snapshot => {
      dispatch(actions.actors.setActors(snapshot.val()));
    });
};

const uploadImageToStorage = async (uri: string): Promise<unknown> => {
  // Resize and Compress image
  const resizedImage = await ImageResizer.createResizedImage(
    uri,
    1200,
    1200,
    'JPEG',
    90,
    0,
    null,
  );
  const resizedImagePath: string = resizedImage.uri;
  const resizedImageFileName: string = resizedImage.name;
  // Create storage reference to not yet existing image
  const reference = storage().ref(resizedImageFileName);
  // Uploads file to firebase storage
  const task = await reference.putFile(resizedImagePath);
  // Get download URL
  const url = await storage().ref(resizedImageFileName).getDownloadURL();
  return { task, url };
};

const createGalleryItemInDatabase = async (
  imageUrl: string,
  timeCreated: string,
  uid: string,
  movieTitle: string,
  sceneTitle: string,
  actorId: string,
) => {
  const galleryItemId = uid + timeCreated;
  const gallery = database().ref(
    `Movies/${movieTitle}/scenes/${sceneTitle}/actors/${actorId}/gallery/${galleryItemId}`,
  );
  // Create gallery item
  await gallery.set({
    imageUrl: imageUrl,
    timeCreated: timeCreated,
    uid: galleryItemId,
  });
};

export const api = {
  login,
  logout,
  register,
  getMovies,
  uploadImageToStorage,
  createGalleryItemInDatabase,
  getActors,
};
