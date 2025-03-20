import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login, register } from 'shared/redux/actions/authActions';
import { Container, TextField, Button, Typography, Paper, Box } from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegistering) {
        await dispatch(register({ email, password, name }));
        alert('Registration successful! Please log in.');
      } else {
        await dispatch(login({ email, password }));
        alert('Login successful!');
      }
    } catch (error) {
      alert(error.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 4, textAlign: 'center', mt: 6 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          {isRegistering ? 'Register' : 'Login'}
        </Typography>

        <form onSubmit={handleSubmit}>
          {isRegistering && (
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <TextField
            fullWidth
            label="Email"
            type="email"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            {isRegistering ? 'Register' : 'Login'}
          </Button>
        </form>

        <Box mt={2}>
          <Button onClick={() => setIsRegistering(!isRegistering)} color="secondary">
            {isRegistering ? 'Already have an account? Log in' : 'Need an account? Register'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
