import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const ActorsGridTile = props => {
  const { width } = props;
  return (
    // <View style={styles.gridItem}>
    //   <Text style={styles.title} numberOfLines={2}>
    //     {props.title}
    //   </Text>
    //   {/* <View style={{ ...styles.container, ...{ backgroundColor: 'pink' } }}>
    //   </View> */}
    //   {/* <TouchableCmp style={{ flex: 1 }} onPress={props.onSelect}>
    //   </TouchableCmp> */}
    // </View>
    <View
      style={{
        height: width / 2 - 45,
        width: width / 2 - 45,
        borderWidth: 0.5,
        borderColor: '#dddddd',
      }}>
      <View style={{ flex: 2 }}>
        <Image
          style={styles.gridImage}
          source={{
            uri: 'https://media.timeout.com/images/103481015/630/472/image.jpg',
          }}
        />
      </View>
      <View style={styles.gridTextContainer}>
        <Text style={styles.gridTextMain}>Angelina Jolie</Text>
        <Text style={styles.gridTextSecond}>Lara croft, Tomb rider</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    // height: width / 2 - 30,
    // width: width / 2 - 30,
    // borderWidth: 0.5,
    // borderColor: '#dddddd',
  },
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
