import React from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
} from 'react-native';

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const MovieGrid = props => {
  const renderItem = ({ item }) => <Item title={props.DATA[item].title} />;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={Object.keys(props.DATA)}
        numColumns={2}
        // renderItem={({ item }) => <Text>{props.DATA[item].title}</Text>}
        renderItem={renderItem}
        // keyExtractor={({ item }) => {
        //   props.DATA[item].id;
        // }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    flex: 1,
    backgroundColor: 'red',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 16,
  },
});

export default MovieGrid;
