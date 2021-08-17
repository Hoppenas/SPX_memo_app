// import { createStore } from 'redux';
// import { rootReducer } from './reducers';

// export const store = createStore(rootReducer);

import { applyMiddleware, compose, createStore } from 'redux';
import { compact } from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import { IPersistedAppState, rootReducer } from './reducers';
import { rootSaga } from './sagas';
import { initReactotron } from '../utils/ReactotronConfig';

const persistConfig = {
  key: 'user',
  storage: AsyncStorage,
};

export const configStore = (initialState?: IPersistedAppState) => {
  let sagaMonitor = undefined;
  let reactorEnhancer = undefined;

  const Reactotron = initReactotron();
  sagaMonitor = Reactotron.createSagaMonitor();
  reactorEnhancer = Reactotron.createEnhancer();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  console.tron = Reactotron;

  const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
  const appliedMiddleware = applyMiddleware(sagaMiddleware);
  const enhancers = compose(...compact([appliedMiddleware, reactorEnhancer]));
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const store = createStore(persistedReducer, initialState, enhancers as any);
  const persistor = persistStore(store);
  sagaMiddleware.run(rootSaga);

  return { store, persistor };
};
