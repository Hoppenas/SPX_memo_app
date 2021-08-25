import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const navigation = useNavigation();

export const logOut = () => {
  auth()
    .signOut()
    .then(() => {
      navigation.navigate('landing');
    });
};
