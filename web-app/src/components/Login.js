import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login, register } from 'shared/redux/actions/authActions';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // Add name field for registration
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
    <div>
      <h2>{isRegistering ? 'Register' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        {isRegistering && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
      </form>
      <button onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? 'Already have an account? Log in' : 'Need an account? Register'}
      </button>
    </div>
  );
};

export default Login;