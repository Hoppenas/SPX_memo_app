import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const MovieGridTile = props => {
  const { movieName, movieId } = props;
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
            uri: 'https://firebasestorage.googleapis.com/v0/b/fir-8824b.appspot.com/o/assets%2FprofilePic%2Fscene.jpg?alt=media&token=631e9c7a-e4a1-4fda-b394-822f08af0f81',
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
