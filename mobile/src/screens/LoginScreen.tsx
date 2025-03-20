import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { login, register } from 'shared/redux/actions/authActions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    try {
      if (isRegistering) {
        await dispatch(register({ email, password, name }));
        Alert.alert('Success', 'Registration successful! Please log in.');
      } else {
        const response = await dispatch(login({ email, password }));
        if (response?.payload?.token) {
          await AsyncStorage.setItem('token', response.payload.token); // Store token locally
          navigation.replace('Home'); // Navigate to Home on login success
        }
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isRegistering ? 'Register' : 'Login'}</Text>

      {isRegistering && (
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
      )}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title={isRegistering ? 'Register' : 'Login'} onPress={handleSubmit} />

      <Button
        title={isRegistering ? 'Already have an account? Log in' : 'Need an account? Register'}
        onPress={() => setIsRegistering(!isRegistering)}
        color="gray"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  input: { borderBottomWidth: 1, marginBottom: 12, padding: 8 },
});

export default LoginScreen;
