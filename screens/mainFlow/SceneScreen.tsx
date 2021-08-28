import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Button,
  Image,
  StatusBar,
  Pressable,
  Animated,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import database from '@react-native-firebase/database';

import FloatingButtonAddActor from '../../components/FloatingButtonsAddActor';
import CreateActorModal from '../../components/CreateActorModal';
import ChooseActorFromListModal from '../../components/ChooseActorFromListModal';

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
  const sceneData = movieData[movieTitle][sceneTitle];
  const [modalVisible, setModalVisible] = useState(false);
  const [galleryModalVisible, setGalleryModalVisible] = useState(false);
  const navigation = useNavigation();

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
  const scrollY = React.useRef(new Animated.Value(0)).current;

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
                    <Image source={{ uri: uri }} style={styles.avatar} />
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
    justifyContent: 'center',
    // backgroundColor: 'red',
    height: '100%',
  },
  sceneTitle: {
    fontSize: 24,
    fontWeight: '700',
    paddingHorizontal: 20,
  },
  modalView: {
    // margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    // padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    // width: '75%',
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
  sceneTitle: { fontSize: 22, fontWeight: '700' },
  sceneLocation: { fontSize: 18, opacity: 0.7 },
  sceneDate: { fontSize: 14, opacity: 0.8, color: '#0099cc' },
});

export default SceneScreen;
