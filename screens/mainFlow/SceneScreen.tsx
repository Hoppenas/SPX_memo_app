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
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import database from '@react-native-firebase/database';

import { actions } from '../../state/actions';
import DefaultButton from '../../components/DefaultButton';
import DefaultInput from '../../components/DefaultInput';
import SceneTile from '../../components/SceneTile';
import FloatingButtonAddActor from '../../components/FloatingButtonsAddActor';
import CreateActorModal from '../../components/CreateActorModal';

const SceneScreen = ({ route }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [navigateToActorID, setNavigateToActorID] = useState('');
  const { sceneTitle, movieTitle } = route.params;
  const { movieData } = useSelector(state => state.app);
  const { gallery } = useSelector(state => state.gallery);
  // const movie = movies[title];
  const { t } = useTranslation();
  const { setLoading } = useSelector(state => state.ui);

  const navigation = useNavigation();

  const handleCreateNewActor = () => {
    setModalVisible(true);
  };

  useEffect(() => {
    console.log(`navigate to actor id: ${navigateToActorID}`);
  }, [navigateToActorID]);

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
          <CreateActorModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            setNavigateToActorID={setNavigateToActorID}
          />
          <FloatingButtonAddActor
            // buttonTwoHandle={() => setModalVisible(true)}
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
