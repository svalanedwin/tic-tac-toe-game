import {
    createGameSession,
    makePlayerMove,
    makeComputerMove,
    getGameSession,
    getGameStats
} from '../../services/api'; // Import API Functions

// Action Types
export const UPDATE_BOARD = 'UPDATE_BOARD';
export const  UPDATE_GAME_STATUS = 'UPDATE_GAME_STATUS';
export const UPDATE_STATS = 'UPDATE_STATS';

// Create a new game session
export const createGame = (startWithPlayer) => async (dispatch) =>{
    try{
    // Call the create game API
    const response = await createGameSession(startWithPlayer);
    const {sessionId, board } = response.data;

    // Dispatch action to update the board
    dispatch({
        type: UPDATE_BOARD,
        payload: board
    });
    // Return sessionId for future moves
    return sessionId;
}catch (error) {
     console.error('Error creating game session:', error);
     throw error;
}
};

// make a player move
export const playerMove = (sessionId, board, index) => async (dispatch) =>{
  try {
    const newBoard = [...board];
    // Assume 'X' is the player's symbol
    newBoard[index] = 'X';

    // Call the player move API
    const response = await makePlayerMove(sessionId, newBoard);
    const { board: updatedBoard, gameStatus } = response.data;

    // Dispatch actions to update the board and game status
    dispatch({
        type: UPDATE_BOARD,
        payload: updatedBoard,
    });
    dispatch({
        type: UPDATE_GAME_STATUS,
        payload: gameStatus,
    });

    // If the game is still ongoing, make the computer move
    if(gameStatus === 'ongoing'){
        dispatch(computerMove(sessionId, updatedBoard));
    }
    
  } catch (error) {
    console.error('Error making player move:', error);
    throw error;
    
  }
};

// Make a computer move
export const computerMove = (sessionId, board) => async (dispatch) =>{
  try {
    // Call the computer move API
    const response = await makeComputerMove(sessionId, board);

    // Dispatch actions to update the board and game status
    dispatch({
        type: UPDATE_BOARD,
        payload: updatedBoard,
    });
    dispatch({
        type: UPDATE_GAME_STATUS,
        payload: gameStatus,
    });


  } catch (error) {
    console.error('Error making computer move:', error);
    throw error;
  }
};

// Fetch game sessions details
export const fetchGameSession = (sessionId) => async (dispatch) =>{
   try {
    // Call the get game session API
    const response = await getGameSession(sessionId);
    const {board, gameStatus} = response.data;

    // Dispatch actions to update the board and game status
    dispatch({
        type: UPDATE_BOARD,
        payload: board,
    });
    dispatch({
        type: UPDATE_GAME_STATUS,
        payload: gameStatus,
    });

   } catch (error) {
    console.error('Error fetching game session:', error);
    throw error;
   }
};

// Fetch user statistics
export const fetchStats = () => async (dispatch) =>{
  try {
    // Call the get stats API
    const response = await getGameStats();
    const stats = response.data;

    // Dispatch action to update statistics
    dispatch({
        type: UPDATE_STATS,
        payload: stats,
    });


  } catch (error) {
    console.error('Error fetching stats:', error);
    throw error;
  }
};