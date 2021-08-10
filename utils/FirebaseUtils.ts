import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const navigation = useNavigation();

export const logOut = () => {
  auth()
    .signOut()
    .then(() => console.log(t('homeScreen:userSignedOut')))
    .then(() => {
      navigation.navigate('landing');
    });
};
