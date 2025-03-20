// web-app/src/redux/actions/authActions.js
import { loginUser, registerUser } from 'shared/services/api';

// Action Types
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';

// Login action
export const login = (credentials) => async (dispatch) => {
  try {
    const response = await loginUser(credentials);
    const { user, token } = response.data;

    // Save token to localStorage
    localStorage.setItem('token', token);

    // Dispatch login success action
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { user, token },
    });
  } catch (error) {
    console.error('Login failed:', error.response?.data?.error || error.message);
    throw error;
  }
};

// Logout action
export const logout = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch({ type: LOGOUT });
};

// Register action
export const register = (userData) => async (dispatch) => {
  try {
    const response = await registerUser(userData);
    const { user, token } = response.data;

    // Save token to localStorage
    localStorage.setItem('token', token);

    // Dispatch login success action
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { user, token },
    });
  } catch (error) {
    console.error('Registration failed:', error.response?.data?.error || error.message);
    throw error;
  }
};