import React from 'react';
import {useState} from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useTranslation} from 'react-i18next';
import {useSelector, useDispatch} from 'react-redux';
import {actions} from '../../state/actions';

const RegistrationScreen = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {t} = useTranslation();
  const dispatch = useDispatch();

  const {isLoading} = useSelector(state => state.ui);

  const createUser = () => {
    dispatch(actions.ui.setLoading(true));
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => dispatch({type: 'ui/SET_LOADING', payload: false}))
      .then(() => {
        changeEmail();
      })
      .then(() => {
        props.navigation.navigate({routeName: 'Home'});
      })
      .then(setEmail(''))
      .then(setPassword(''))
      .catch(error => {
        dispatch(actions.ui.setLoading(false));

        if (error.code === 'auth/email-already-in-use') {
          console.log(t('registration:erorEmailAlreadyInUse'));
        }

        if (error.code === 'auth/invalid-email') {
          console.log(t('registration:erorEmailInvalid'));
        }

        console.error(error);
      });
  };

  return (
    <View style={styles.screen}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <TextInput
            placeholder={t('registration:placeholderEmail')}
            onChangeText={setEmail}
            value={email}
            style={styles.textInput}
          />
          <TextInput
            placeholder={t('registration:placeholderPassword')}
            onChangeText={setPassword}
            value={password}
            style={styles.textInput}
            secureTextEntry={true}
          />
          <Button
            title={t('registration:placeholderPassword')}
            onPress={createUser}
          />
          <Text
            style={styles.text}
            onPress={() => {
              props.navigation.navigate({routeName: 'Login'});
            }}>
            {t('registration:buttonLogin')}
          </Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'grey',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  text: {
    color: 'blue',
    marginTop: 20,
  },
});

export default RegistrationScreen;
