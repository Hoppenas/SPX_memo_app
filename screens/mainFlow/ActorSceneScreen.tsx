import React, { useState, useCallback } from 'react';
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
import {
  launchCamera,
  launchImageLibrary,
  ImageLibraryOptions,
} from 'react-native-image-picker';

import { actions } from '../../state/actions';

const ActorSceneScreen = ({ route }) => {
  const { actorId } = route.params;
  const { movieData } = useSelector(state => state.app);
  const { setLoading } = useSelector(state => state.ui);

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.screen}>
      {setLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={styles.screen}>
          <Text style={styles.actorTitle}>actor name</Text>
          <Text>actor id: {actorId}</Text>
          <Button
            title={'console info'}
            onPress={() => console.log(movieData)}
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
  actorTitle: {
    fontSize: 24,
    fontWeight: '700',
    paddingHorizontal: 20,
  },
});

export default ActorSceneScreen;
