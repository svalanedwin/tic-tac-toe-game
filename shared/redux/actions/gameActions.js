import axios from 'axios';
import {
  createGameSession,
  makePlayerMove,
  makeComputerMove,
  getGameSession,
  getGameStats,
} from 'shared/services/api';

// Action Types
export const UPDATE_BOARD = 'UPDATE_BOARD';
export const UPDATE_GAME_STATUS = 'UPDATE_GAME_STATUS';
export const UPDATE_STATS = 'UPDATE_STATS';
export const SET_SESSION_ID = 'SET_SESSION_ID';

// Create a new game session
export const createGame = (startWithPlayer) => async (dispatch) => {
  try {
    const response = await createGameSession(startWithPlayer);
    
    console.log('Raw Backend Response:', response); // Debugging step

    // Ensure response is properly formatted JSON
    if (typeof response.data !== 'object') {
      throw new Error('Invalid JSON response from backend');
    }

    const { board, sessionId, status } = response.data;

    dispatch({
      type: UPDATE_BOARD,
      payload: board.flat(),
    });

    dispatch({
      type: SET_SESSION_ID,
      payload: sessionId,
    });

    return sessionId;
  } catch (error) {
    console.error('Error creating game:', error);
    throw error;
  }
};


// Make a player move
export const playerMove = (sessionId, board, index) => async (dispatch) => {
  try {
    const newBoard = [...board]; // Copy board state
    newBoard[index] = -1; // Player move (X)

    // Convert the flattened array back into a 2D array
    const board2D = [
      [...newBoard.slice(0, 3)],
      [...newBoard.slice(3, 6)],
      [...newBoard.slice(6, 9)],
    ];

    // Fix payload: Send board as an **array**, not a string
    const payload = {
      sessionId: Number(sessionId), // Convert sessionId to number
      board: board2D, // Send actual array, not JSON string
    };

    console.log('Sending payload to backend:', JSON.stringify(payload, null, 2));

    const response = await makePlayerMove(payload);
    console.log('Received response from backend:', response.data);

    dispatch({
      type: UPDATE_BOARD,
      payload: response.data.board.flat(),
    });
    dispatch({
      type: UPDATE_GAME_STATUS,
      payload: response.data.status,
    });

    if (response.data.status === 'ongoing') {
      dispatch(computerMove(sessionId, response.data.board));
    }
  } catch (error) {
    console.error('Error making player move:', error.response?.data || error.message);
    throw error;
  }
};


// Make a computer move
export const computerMove = (sessionId, board) => async (dispatch) => {
  try {
    // ✅ Ensure board is a proper 2D array
    if (!Array.isArray(board) || board.length !== 3 || !board.every(row => Array.isArray(row) && row.length === 3)) {
      console.error("❌ Invalid board format before sending to backend:", board);
      return;
    }

    const payload = {
      sessionId: Number(sessionId),  // ✅ Ensure sessionId is a number
      board: board,  // ✅ Ensure board is an array, not a string
      current_player: "o"  // ✅ Required by FastAPI
    };

    console.log("🤖 Sending computer move request to backend:", JSON.stringify(payload, null, 2));

    const response = await makeComputerMove(payload);
    console.log("📩 Response from backend (computer move):", response.data);

    if (!response.data.board) {
      console.error("❌ Backend did not return a board for AI move.");
      return;
    }

    dispatch({
      type: UPDATE_BOARD,
      payload: response.data.board.flat(),
    });

    dispatch({
      type: UPDATE_GAME_STATUS,
      payload: response.data.status,
    });

  } catch (error) {
    console.error("❌ Error making computer move:", error.response?.data || error.message);
  }
};





// Fetch game statistics
export const fetchStats = () => async (dispatch) => {
  try {
    const response = await getGameStats();
    dispatch({ type: UPDATE_STATS, payload: response.data });
  } catch (error) {
    console.error('Error fetching stats:', error);
  }
};
