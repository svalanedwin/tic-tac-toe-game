import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { logout } from 'shared/redux/actions/authActions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token'); // Remove token locally
    await dispatch(logout());
    navigation.replace('Login'); // Redirect to Login
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Tic-Tac-Toe</Text>
      <Button title="Start Game" onPress={() => navigation.navigate('Game')} />
      <Button title="Logout" onPress={handleLogout} color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
});

export default HomeScreen; Argument of type '(dispatch: any) => void' is not assignable to parameter of type 'UnknownAction'.ts(2345)
(alias) logout(): (dispatch: any) => void
import logout