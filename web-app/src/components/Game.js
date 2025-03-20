import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createGame, playerMove, fetchStats, UPDATE_GAME_STATUS } from 'shared/redux/actions/gameActions';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { logout } from 'shared/redux/actions/authActions';

const Game = () => {
  const dispatch = useDispatch();
  const { board, gameStatus, stats, sessionId } = useSelector((state) => state.game);
  const user = useSelector((state) => state.auth.user); // ✅ Get logged-in user

  const [dialogOpen, setDialogOpen] = useState(false);
  const [winnerMessage, setWinnerMessage] = useState('');
  const [localGameStatus, setLocalGameStatus] = useState(gameStatus);

  useEffect(() => {
    dispatch(createGame(true));
    dispatch(fetchStats());
  }, [dispatch]);

  useEffect(() => {
    if (gameStatus && gameStatus !== 'ongoing') {
      let message = gameStatus.toUpperCase();

      if (gameStatus === 'x wins') {
        message = user?.name ? `${user.name} Wins! 🎉` : "X Wins! 🎉";
      } else if (gameStatus === 'o wins') {
        message = "Computer Wins! 🤖";
      }

      setWinnerMessage(message);
      setDialogOpen(true);
      dispatch(fetchStats()); // 🔄 Fetch updated stats immediately
    }
  }, [gameStatus, dispatch, user]);

  const handleCellClick = (index) => {
    if (board[index] === 0 && gameStatus === 'ongoing' && sessionId) {
      dispatch(playerMove(sessionId, board, index));
    }
  };

  const handleNewGame = () => {
    setDialogOpen(false);
    setWinnerMessage('');
    setLocalGameStatus('ongoing');
    dispatch({ type: UPDATE_GAME_STATUS, payload: 'ongoing' });
    dispatch(createGame(true));
  };

  const handleExitGame = () => {
    dispatch(logout()); // ✅ Logout and go back to login screen
  };

  return (
    <div className="game-container">
      {/* Exit Game Button */}
      <button className="exit-button" onClick={handleExitGame}>Exit Game ⏏</button>

      <h2>Tic-Tac-Toe</h2>
      <div className="board">
        {board.map((cell, index) => (
          <div
            key={index}
            className="cell"
            onClick={() => handleCellClick(index)}
            style={{ cursor: cell === 0 && localGameStatus === 'ongoing' ? 'pointer' : 'default' }}
          >
            {cell === -1 ? 'X' : cell === 1 ? 'O' : ''}
          </div>
        ))}
      </div>
      <p className="status">Status: {gameStatus}</p>

      {/* Statistics Section */}
      <div className="stats-container">
        <h3>Statistics</h3>
        <p>Total Games: {stats?.totalGames || 0}</p>
        <p>Wins: {stats?.wins || 0}</p>
        <p>Losses: {stats?.losses || 0}</p>
        <p>Draws: {stats?.draws || 0}</p>
      </div>

      {/* Game Over Dialog */}
      <Dialog open={dialogOpen} onClose={handleNewGame}>
        <DialogTitle>Game Over</DialogTitle>
        <DialogContent>
          <p className="winner-message">{winnerMessage}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNewGame} color="primary" variant="contained">
            Play Again
          </Button>
          <Button onClick={handleExitGame} color="secondary" variant="contained">
            Exit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Game;
