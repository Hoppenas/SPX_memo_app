import React from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Text,
  Image,
  StatusBar,
  Pressable,
  Animated,
} from 'react-native';
import { useSelector } from 'react-redux';

import FloatingCloseButton from './FloatingCloseButton';

const SPACING = 20;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;
const uri =
  'https://firebasestorage.googleapis.com/v0/b/fir-8824b.appspot.com/o/assets%2FprofilePic%2Fscene.jpg?alt=media&token=631e9c7a-e4a1-4fda-b394-822f08af0f81';

interface ChooseActorFromListModalProps {
  modalVisible: boolean;
  setModalVisible: (event: unknown) => void;
  handleAddActor: (event: unknown) => void;
  name: string;
  phone: string;
  email: string;
}

const ChooseActorFromListModal: React.FC<ChooseActorFromListModalProps> =
  props => {
    const { modalVisible, setModalVisible, handleAddActor } = props;
    const { actorsData } = useSelector(state => state.actors);

    const DATA = Object.values(actorsData);
    const scrollY = React.useRef(new Animated.Value(0)).current;

    const closeModal = () => {
      setModalVisible(false);
    };

    interface IaddActorToScene {
      id: string;
    }

    const addActorToScene = (values: IaddActorToScene) => {
      if (handleAddActor) {
        handleAddActor(values.id);
      }
      closeModal(false);
    };

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalView}>
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
                    addActorToScene(item);
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
          <FloatingCloseButton setModalVisible={setModalVisible} />
        </View>
      </Modal>
    );
  };

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    flex: 1,
  },
  centeredView: {
    // justifyContent: 'center',
    // alignItems: 'center',
    // height: '90%',
    // width: '90%',
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
  },
  inputField: {
    marginTop: 20,
    marginBottom: 5,
    paddingLeft: 10,
    height: 40,
    borderRadius: 5,
    width: '80%',
    borderWidth: 1.5,
    borderColor: 'blue',
  },
  screen: { flex: 1, backgroundColor: '#FFF' },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE,
    marginRight: SPACING / 2,
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: '700',
    paddingHorizontal: 20,
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

export default ChooseActorFromListModal;
