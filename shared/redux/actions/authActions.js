import { loginUser, registerUser, fetchUser } from 'shared/services/api';

// Action Types
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const LOAD_USER = 'LOAD_USER';



// Login action
export const login = (credentials) => async (dispatch) => {
  try {
    const response = await loginUser(credentials);
    const { user, token } = response.data;

    localStorage.setItem('token', token);
    dispatch({ type: LOGIN_SUCCESS, payload: { user, token } });
  } catch (error) {
    console.error('Login failed:', error.message);
    throw error;
  }
};

// Logout action
export const logout = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch({ type: LOGOUT });
   // ✅ Navigate to login screen
   window.location.href = '/';
};

// Register action
export const register = (userData) => async (dispatch) => {
  try {
    const response = await registerUser(userData);
    const { user, token } = response.data;

    localStorage.setItem('token', token);
    dispatch({ type: LOGIN_SUCCESS, payload: { user, token } });
  } catch (error) {
    console.error('Registration failed:', error.message);
    throw error;
  }
};
