import React, { useState, useLayoutEffect, useCallback } from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  StatusBar,
  Pressable,
  Animated,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import database from '@react-native-firebase/database';
import { actions } from '../../state/actions';

import FloatingButtonAddActor from '../../components/FloatingButtonsAddActor';
import CreateActorModal from '../../components/CreateActorModal';
import ChooseActorFromListModal from '../../components/ChooseActorFromListModal';
import DeleteButton from '../../components/DeleteButton';
import DeleteModal from '../../components/deleteMovieModal';

const SPACING = 20;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;
const uri =
  'https://firebasestorage.googleapis.com/v0/b/fir-8824b.appspot.com/o/assets%2FprofilePic%2Fclown.jpg?alt=media&token=60f8a048-e475-48ee-93cc-710ef28f0508';

const SceneScreen = ({ route }) => {
  const { sceneTitle, movieTitle } = route.params;
  const { setLoading } = useSelector(state => state.ui);
  const { movieData } = useSelector(state => state.app);
  const { actorsData } = useSelector(state => state.actors);

  const [modalVisible, setModalVisible] = useState(false);
  const [galleryModalVisible, setGalleryModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const navigation = useNavigation();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const scrollY = React.useRef(new Animated.Value(0)).current;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <DeleteButton setModalVisible={setDeleteModalVisible} />
      ),
    });
  }, [navigation]);

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
  };

  const handleDelete = useCallback(movieId => {
    navigation.navigate('scene', {
      sceneTitle: sceneTitle,
      movieTitle: movieTitle,
    });
    dispatch(actions.gallery.deleteScene(movieId, sceneTitle));
  }, []);

  if (!movieData[movieTitle].scenes[sceneTitle].actors) {
    return (
      <View style={styles.noImagesContainer}>
        <Text style={styles.sceneLocation}>{t('scenes:noActors')}</Text>
        <DeleteModal
          modalVisible={deleteModalVisible}
          setModalVisible={setDeleteModalVisible}
          movieTitle={movieTitle}
          handleDelete={handleDelete}
          movieId={movieTitle}
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
    );
  } else {
    // actorsData
    const actorsIds = Object.keys(
      movieData[movieTitle].scenes[sceneTitle].actors,
    );

    const filteredActorsOfScene = Object.keys(actorsData)
      .filter(key => actorsIds.includes(key))
      .reduce((obj, key) => {
        obj[key] = actorsData[key];
        return obj;
      }, {});

    const DATA = Object.values(filteredActorsOfScene);

    return (
      <SafeAreaView>
        {setLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <View style={styles.screen}>
            <Animated.FlatList
              data={DATA}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                { useNativeDriver: true },
              )}
              keyExtractor={item => item.id}
              contentContainerStyle={{
                padding: SPACING,
                paddingTop: StatusBar.currentHeight || 42,
              }}
              renderItem={({ item, index }) => {
                const inputRange = [
                  -1,
                  0,
                  ITEM_SIZE * index,
                  ITEM_SIZE * (index + 2),
                ];

                const opacityInputRange = [
                  -1,
                  0,
                  ITEM_SIZE * index,
                  ITEM_SIZE * (index + 1),
                ];

                const scale = scrollY.interpolate({
                  inputRange,
                  outputRange: [1, 1, 1, 0],
                });

                const opacity = scrollY.interpolate({
                  inputRange: opacityInputRange,
                  outputRange: [1, 1, 1, 0],
                });

                return (
                  <Pressable
                    onPress={() => {
                      navigation.navigate('actorScene', {
                        sceneTitle: sceneTitle,
                        movieTitle: movieTitle,
                        actorId: item.id,
                      });
                    }}>
                    <Animated.View
                      style={[
                        styles.sceneContainer,
                        { opacity, transform: [{ scale }] },
                      ]}>
                      <Image
                        source={{ uri: item.prifilePic }}
                        style={styles.avatar}
                      />
                      <View>
                        <Text style={styles.sceneTitle}>{item.name}</Text>
                        <Text style={styles.sceneLocation}>{item.phone}</Text>
                        <Text style={styles.sceneDate}>{item.email}</Text>
                      </View>
                    </Animated.View>
                  </Pressable>
                );
              }}
            />
            <DeleteModal
              modalVisible={deleteModalVisible}
              setModalVisible={setDeleteModalVisible}
              movieTitle={movieTitle}
              handleDelete={handleDelete}
              movieId={movieTitle}
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
  }
};

const styles = StyleSheet.create({
  screen: {
    justifyContent: 'center',
    height: '100%',
  },
  sceneTitle: {
    fontSize: 24,
    fontWeight: '700',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
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
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE,
    marginRight: SPACING / 2,
  },
  sceneContainer: {
    flexDirection: 'row',
    padding: SPACING,
    marginBottom: SPACING,
    backgroundColor: 'rgba(255,255,255,1)',
    borderRadius: 12,
    elevation: 4,
  },
  sceneLocation: { fontSize: 18, opacity: 0.7 },
  sceneDate: { fontSize: 14, opacity: 0.8, color: '#0099cc' },
  noImagesContainer: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,1)',
    paddingHorizontal: SPACING / 2,
    justifyContent: 'space-between',
  },
});

export default SceneScreen;
