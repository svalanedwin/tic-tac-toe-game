import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createGame, playerMove, fetchStats } from 'shared/redux/actions/gameActions';

const Game = () => {
  const dispatch = useDispatch();
  const { board, gameStatus, stats, sessionId } = useSelector((state) => state.game);

  useEffect(() => {
    dispatch(createGame(true));
    dispatch(fetchStats());
  }, [dispatch]);

  const handleCellClick = (index) => {
    if (board[index] === 0 && gameStatus === 'ongoing' && sessionId) {
      dispatch(playerMove(sessionId, board, index));
    }
  };

  return (
    <div className="game-container">
      <h2>Tic-Tac-Toe</h2>
      <div className="board">
        {board.map((cell, index) => (
          <div
            key={index}
            className="cell"
            onClick={() => handleCellClick(index)}
            style={{ cursor: cell === null && gameStatus === 'ongoing' ? 'pointer' : 'default' }}
          >
            {cell === -1 ? 'X' : cell === 1 ? 'O' : ''}
          </div>
        ))}
      </div>
      <p>Status: {gameStatus}</p>
      <div>
        <h3>Statistics</h3>
        <p>Total Games: {stats.totalGames}</p>
        <p>Wins: {stats.wins}</p>
        <p>Losses: {stats.losses}</p>
        <p>Draws: {stats.draws}</p>
      </div>
    </div>
  );
};

export default Game;