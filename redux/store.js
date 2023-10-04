import { configureStore } from '@reduxjs/toolkit';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authReducer } from './auth/auth-slice';
import { postsReducer } from './posts/posts-slice';

const persistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  // whitelist: ['user'],
};


const store = configureStore({
  reducer: {
    auth: persistReducer(persistConfig, authReducer),
    posts: postsReducer,
},
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };