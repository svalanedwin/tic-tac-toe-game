import { combineReducers } from 'redux';
import authReducer from './authReducer';
import gameReducer from './gameReducer';

// Combine reducers
const rootReducer = combineReducers({
    auth: authReducer, // Handles authentication state
    game: gameReducer, // Handles game state
});

export default rootReducer;