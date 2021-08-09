import React, { useState } from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import database from '@react-native-firebase/database';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

import DefaultButton from '../../components/DefaultButton';
import DefaultInput from '../../components/DefaultInput';
import MovieGridTile from '../../components/MovieGridTile';
import ActorsGridTile from '../../components/ActorsGridTile';
import MovieGrid from '../../components/MovieGrid';

const { height, width } = Dimensions.get('window');

const HomeScreen = () => {
  const { t } = useTranslation();
  const { isLoading } = useSelector(state => state.ui);
  const { email } = useSelector(state => state.user);
  const { movies } = useSelector(state => state.user);
  const [movieName, setMovieName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [director, setDirector] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();

  const logOut = () => {
    auth()
      .signOut()
      .then(() => console.log(t('homeScreen:userSignedOut')))
      .then(() => {
        navigation.navigate('landing');
      });
  };

  const createMovie = () => {
    if (movies[movieName]) {
      console.log('movie exists');
    } else {
      const newReference = database().ref('/Movies').push();
      database()
        .ref(`Movies/${movieName}`)
        .set({
          id: newReference.key,
          title: movieName,
          'start date': startDate,
          director: director,
          administrators: [email],
          scenes: [],
        });

      setMovieName('');
      setModalVisible(false);
      setStartDate('');
      setDirector('');
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <DefaultInput
                  placeholder={t('homeScreen:enterNewMovieName')}
                  onChangeText={setMovieName}
                  value={movieName}
                />
                <DefaultInput
                  placeholder={t('homeScreen:enterStartDate')}
                  onChangeText={setStartDate}
                  value={startDate}
                />
                <DefaultInput
                  placeholder={t('homeScreen:enterDirector')}
                  onChangeText={setDirector}
                  value={director}
                />
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={createMovie}>
                  <Text style={styles.textStyle}>
                    {t('homeScreen:buttonCreateNewMovie')}
                  </Text>
                </Pressable>
              </View>
            </View>
          </Modal>
          <DefaultButton
            title={t('homeScreen:buttonCreateNewMovie')}
            onPress={() => setModalVisible(true)}
          />
          <DefaultButton
            title={t('homeScreen:buttonLogout')}
            onPress={logOut}
          />
          <ScrollView scrollEventThrottle={16}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'white',
                paddingTop: 20,
              }}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: '700',
                  paddingHorizontal: 20,
                }}>
                Movies
              </Text>
              <View style={{ height: 130, marginTop: 20 }}>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}>
                  {Object.keys(movies).map((movie, index) =>
                    movies[movie].administrators.includes(email) ? (
                      <MovieGridTile
                        key={index}
                        movieData={movies[movie]}
                        title={movie}
                      />
                    ) : (
                      <></>
                    ),
                  )}
                </ScrollView>
              </View>
              <View style={{ marginTop: 40 }}>
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: '700',
                    paddingHorizontal: 20,
                  }}>
                  Actors
                </Text>
                <View
                  style={{
                    paddingHorizontal: 20,
                    marginTop: 20,
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                  }}>
                  <ActorsGridTile width={width} />
                  <ActorsGridTile width={width} />
                  <ActorsGridTile width={width} />
                  <ActorsGridTile width={width} />
                  <ActorsGridTile width={width} />
                </View>
              </View>
            </View>
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginHorizontal: 15,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 15,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default HomeScreen;
