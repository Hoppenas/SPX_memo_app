import React, { useState } from 'react';
import {
  Image,
  ActivityIndicator,
  View,
  Text,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  Animated,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import DefaultButton from '../../components/DefaultButton';
import SceneTile from '../../components/SceneTile';
import FloatingSingleButton from '../../components/floatingSingleButton';
import CreateSceneModal from '../../components/CreateSceneModal';

const SPACING = 20;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;
const uri =
  'https://firebasestorage.googleapis.com/v0/b/fir-8824b.appspot.com/o/assets%2FprofilePic%2Fscene.jpg?alt=media&token=631e9c7a-e4a1-4fda-b394-822f08af0f81';

const MovieScreen = ({ route }) => {
  const { movieId } = route.params;
  const { movieData } = useSelector(state => state.app);
  const movie = movieData[movieId];
  const { t } = useTranslation();
  const { setLoading } = useSelector(state => state.ui);
  const [modalVisible, setModalVisible] = useState(false);

  const openCreateNewSceneModal = () => {
    setModalVisible(true);
  };

  const DATA = Object.values(movie.scenes);

  const scrollY = React.useRef(new Animated.Value(0)).current;

  // return (
  //   <SafeAreaView style={styles.screen}>
  //     {setLoading ? (
  //       <ActivityIndicator size="large" color="#0000ff" />
  //     ) : (
  //       <View style={styles.movieContainer}>
  //         <CreateSceneModal
  //           modalVisible={modalVisible}
  //           setModalVisible={setModalVisible}
  //           movieId={movieId}
  //         />
  //         <Text style={styles.movieTitle}>{movieData[movieId].title}</Text>
  //         <Text style={styles.movieDirector}>
  //           {movieData[movieId].director}
  //         </Text>
  //         <Text style={styles.movieDirector}>
  //           {movieData[movieId].administrators}
  //         </Text>
  //         <Text style={styles.movieScenes}>{t('movieScreen:sceneTitle')}:</Text>
  //         {movie.scenes &&
  //           Object.keys(movie.scenes).map((scene, index) => (
  //             <SceneTile
  //               key={index}
  //               sceneTitle={movie.scenes[scene].title}
  //               movieTitle={movieId}
  //             />
  //           ))}
  //         <DefaultButton
  //           title={'print'}
  //           onPress={() => console.log(Object.values(movie.scenes))}
  //         />
  //       </View>
  //     )}
  //     <FloatingSingleButton openCreateNewSceneModal={openCreateNewSceneModal} />
  //   </SafeAreaView>
  // );

  return (
    <View style={{ flex: 1, backgroundColor: '#FFF' }}>
      <Animated.FlatList
        data={DATA}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true },
        )}
        keyExtractor={item => item.title}
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
            <Animated.View
              style={{
                flexDirection: 'row',
                padding: SPACING,
                marginBottom: SPACING,
                backgroundColor: 'rgba(255,255,255,1)',
                borderRadius: 12,
                elevation: 4,
                opacity,
                transform: [{ scale }],
              }}>
              <Image
                source={{ uri: uri }}
                style={{
                  width: AVATAR_SIZE,
                  height: AVATAR_SIZE,
                  borderRadius: AVATAR_SIZE,
                  marginRight: SPACING / 2,
                }}
              />
              <View>
                <Text style={{ fontSize: 22, fontWeight: '700' }}>
                  {item.title}
                </Text>
                <Text style={{ fontSize: 18, opacity: 0.7 }}>
                  {item.location}
                </Text>
                <Text style={{ fontSize: 14, opacity: 0.8, color: '#0099cc' }}>
                  {item.date}
                </Text>
              </View>
            </Animated.View>
          );
        }}
      />
      <CreateSceneModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        movieId={movieId}
      />
      <FloatingSingleButton openCreateNewSceneModal={openCreateNewSceneModal} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  movieContainer: {},
  movieTitle: {
    fontSize: 24,
    fontWeight: '700',
    paddingHorizontal: 20,
  },
  movieScenes: {
    fontSize: 24,
    fontWeight: '700',
    paddingHorizontal: 20,
    backgroundColor: 'grey',
  },
  movieDirector: {
    fontSize: 12,
    color: '#b63838',
  },
});

export default MovieScreen;
