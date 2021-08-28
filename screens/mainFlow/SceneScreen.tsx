import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Button,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import database from '@react-native-firebase/database';

import FloatingButtonAddActor from '../../components/FloatingButtonsAddActor';
import CreateActorModal from '../../components/CreateActorModal';
import ChooseActorFromListModal from '../../components/ChooseActorFromListModal';

const SceneScreen = ({ route }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [galleryModalVisible, setGalleryModalVisible] = useState(false);
  const { sceneTitle, movieTitle } = route.params;
  const { setLoading } = useSelector(state => state.ui);

  const navigation = useNavigation();

  const handleCreateNewActor = () => {
    setModalVisible(true);
  };

  const handleAddActor = navigateToActorID => {
    const newReference = database().ref(
      `/Movies/${movieTitle}/scenes/${sceneTitle}/actors/${navigateToActorID}`,
    );
    newReference.set({
      id: navigateToActorID,
      gallery: [],
    });

    navigation.navigate('actorScene', {
      sceneTitle: sceneTitle,
      movieTitle: movieTitle,
      actorId: navigateToActorID,
    });
  };

  return (
    <SafeAreaView style={styles.screen}>
      {setLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={styles.screen}>
          <Text style={styles.sceneTitle}>{sceneTitle}</Text>
          <Button
            onPress={() => {
              navigation.navigate('actorScene', {
                sceneTitle: sceneTitle,
                movieTitle: movieTitle,
                actorId: '123',
              });
            }}
            title={'Actor 1'}
          />
          <ChooseActorFromListModal
            modalVisible={galleryModalVisible}
            setModalVisible={setGalleryModalVisible}
            handleAddActor={handleAddActor}
          />
          <CreateActorModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            handleAddActor={handleAddActor}
          />
          <FloatingButtonAddActor
            buttonOneHandle={() => setGalleryModalVisible(true)}
            buttonTwoHandle={handleCreateNewActor}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  sceneTitle: {
    fontSize: 24,
    fontWeight: '700',
    paddingHorizontal: 20,
  },
});

export default SceneScreen;
