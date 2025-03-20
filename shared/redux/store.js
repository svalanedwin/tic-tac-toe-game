// web-app/src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import authReducer from './reducers/authReducer';
import gameReducer from './reducers/gameReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    game: gameReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;