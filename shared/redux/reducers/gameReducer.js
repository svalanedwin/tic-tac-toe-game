import { UPDATE_BOARD, UPDATE_GAME_STATUS, UPDATE_STATS} from '../actions/gameActions'

// Initial state for the game
const initialState = {
    board: Array(9).fill(''), // Represents the Tic-Tac-Toe board
    gameStatus: 'ongoing', // Tracks the game status (ongoing, win, loss, draw)
    
    // Tracks user statistics
    stats: {
        totalGames: 0,
        wins: 0,
        losses: 0,
        draws: 0,
    },
};

// Game reducer
const gameReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_BOARD:
            return {
              ...state,
              board: action.payload, // Update the board

            };
        case UPDATE_GAME_STATUS:
             return {
                ...state,
                gameStatus: action.payload, // Update the game status
             };
        case UPDATE_STATS:
            return{
                ...state,
                stats: action.payload, // Update user statistics
            };
    
        default:
           return state; // Return current state for unknown actions
    }
};

export default gameReducer;