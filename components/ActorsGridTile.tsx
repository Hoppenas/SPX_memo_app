import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface ActorsGridTileProps {
  width: number;
  actordata: any;
  actorId: string;
}

const ActorsGridTile: React.FC<ActorsGridTileProps> = props => {
  const { width, actordata, actorId } = props;
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => {
        navigation.navigate('actor', {
          actorId: actorId,
        });
      }}>
      <View
        style={{
          height: width / 2 - 45,
          width: width / 2 - 45,
        }}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.gridImage}
            source={{
              uri: actordata.prifilePic,
            }}
          />
        </View>
        <View style={styles.gridTextContainer}>
          <Text style={styles.gridTextMain}>{actordata.name}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  imageContainer: { flex: 2 },
  gridImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  gridTextContainer: {
    flex: 1,
    alignItems: 'flex-start',
    paddingLeft: 10,
  },
  gridTextMain: {
    fontSize: 14,
    color: 'black',
  },
  gridTextSecond: {
    fontSize: 12,
    color: '#b63838',
  },
});

export default ActorsGridTile;
