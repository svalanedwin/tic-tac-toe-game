import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Button, Alert, StyleSheet, Modal } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createGame, playerMove, fetchStats, UPDATE_GAME_STATUS } from 'shared/redux/actions/gameActions';
import { logout } from 'shared/redux/actions/authActions';

const GameScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { board, gameStatus, stats, sessionId } = useSelector((state) => state.game);
  const user = useSelector((state) => state.auth.user);

  const [modalVisible, setModalVisible] = useState(false);
  const [winnerMessage, setWinnerMessage] = useState('');

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
      setModalVisible(true);
      dispatch(fetchStats()); // Fetch updated stats
    }
  }, [gameStatus, dispatch, user]);

  const handleCellClick = (index) => {
    if (board[index] === 0 && gameStatus === 'ongoing' && sessionId) {
      dispatch(playerMove(sessionId, board, index));
    }
  };

  const handleNewGame = () => {
    setModalVisible(false);
    setWinnerMessage('');
    dispatch({ type: UPDATE_GAME_STATUS, payload: 'ongoing' });
    dispatch(createGame(true));
  };

  const handleExitGame = () => {
    dispatch(logout());
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <Button title="Exit Game" onPress={handleExitGame} color="red" />
      <Text style={styles.title}>Tic-Tac-Toe</Text>

      <View style={styles.board}>
        {board.map((cell, index) => (
          <TouchableOpacity
            key={index}
            style={styles.cell}
            onPress={() => handleCellClick(index)}
          >
            <Text style={styles.cellText}>{cell === -1 ? 'X' : cell === 1 ? 'O' : ''}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text>Status: {gameStatus}</Text>

      {/* Game Over Modal */}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.winnerText}>{winnerMessage}</Text>
            <Button title="Play Again" onPress={handleNewGame} />
            <Button title="Exit" onPress={handleExitGame} color="red" />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  board: { flexDirection: 'row', flexWrap: 'wrap', width: 200, marginTop: 20 },
  cell: { width: 60, height: 60, borderWidth: 1, justifyContent: 'center', alignItems: 'center' },
  cellText: { fontSize: 24, fontWeight: 'bold' },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { backgroundColor: 'white', padding: 20, borderRadius: 10, alignItems: 'center' },
  winnerText: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
});

export default GameScreen;
