import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MovieGridTile = props => {
  const { movieName, movieId, movieData } = props;
  const navigation = useNavigation();

  return (
    <Pressable
      style={styles.gridItem}
      onPress={() => {
        navigation.navigate('movie', {
          movieId: movieId,
          movieTitle: movieName,
        });
      }}>
      <View style={{ flex: 2 }}>
        <Image
          style={styles.gridImage}
          source={{
            uri: movieData.profilePic,
          }}
        />
      </View>
      <View style={styles.gridText}>
        <Text>{movieName}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    height: 130,
    width: 130,
    marginLeft: 20,
  },
  gridImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  gridText: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default MovieGridTile;
