import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';

import MainNavigator from './navigation/MainNavigator';
import LanguageKey from './components/LanguageKey';
import './utils/locale';
import { store } from './state/store';

const App = () => {
  return (
    <Provider store={store}>
      <MainNavigator />
      <LanguageKey />
    </Provider>
  );
};

export default App;
