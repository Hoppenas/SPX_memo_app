import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import MainNavigator from './navigation/MainNavigator';
import LanguageKey from './components/LanguageKey';
import './utils/locale';
import { configStore } from './state/store';

const { store, persistor } = configStore();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainNavigator />
        <LanguageKey />
      </PersistGate>
    </Provider>
  );
};

export default App;
