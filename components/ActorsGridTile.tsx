import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

interface ActorsGridTileProps {
  width: number;
  actordata: any;
  actorId: string;
}

const ActorsGridTile: React.FC<ActorsGridTileProps> = props => {
  const { width, actordata, actorId } = props;
  return (
    <View
      style={{
        height: width / 2 - 45,
        width: width / 2 - 45,
        borderWidth: 0.5,
        borderColor: '#dddddd',
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
        <Text style={styles.gridTextSecond}>Lara croft, Tomb rider</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: { flex: 2 },
  gridImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  gridTextContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    paddingLeft: 10,
  },
  gridTextMain: {
    fontSize: 14,
    color: '#b63838',
  },
  gridTextSecond: {
    fontSize: 12,
    color: '#b63838',
  },
});

export default ActorsGridTile;
