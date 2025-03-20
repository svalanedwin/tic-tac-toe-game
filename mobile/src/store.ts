// mobile/src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import gameReducer from 'shared/redux/reducers/gameReducer';
import authReducer from 'shared/redux/reducers/authReducer';
import { combineReducers } from 'redux';

// 🔹 Define persist config
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'], // Persist only auth state
};

// 🔹 Combine reducers
const rootReducer = combineReducers({
  game: gameReducer,
  auth: persistReducer(persistConfig, authReducer), // Persist auth
});

// 🔹 Create store
const store = configureStore({
  reducer: rootReducer,
});

const persistor = persistStore(store);

// ✅ Define TypeScript types for state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store, persistor };
