import { UPDATE_BOARD, UPDATE_GAME_STATUS, UPDATE_STATS, SET_SESSION_ID } from '../actions/gameActions';

const initialState = {
  board: Array(9).fill(0), // Initialize with 0s (empty cells)
  gameStatus: 'ongoing',
  stats: {
    totalGames: 0,
    wins: 0,
    losses: 0,
    draws: 0,
  },
  sessionId: null, // Add sessionId to the state
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_BOARD:
      return {
        ...state,
        board: [...action.payload], // Create a new array
      };
    case UPDATE_GAME_STATUS:
      return {
        ...state,
        gameStatus: action.payload,
      };
    case UPDATE_STATS:
      return {
        ...state,
        stats: { ...action.payload }, // Ensure new object
      };
    case SET_SESSION_ID:
      return {
        ...state,
        sessionId: action.payload,
      };
    default:
      return state;
  }
};

export default gameReducer;
