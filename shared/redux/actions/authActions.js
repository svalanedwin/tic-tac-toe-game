import { loginUser, registerUser } from '../../services/api'

// Action Types
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';

// Login action
export const login = (credentials) => async (dispatch) =>{
   try {
    // Call the login API
    const response = await loginUser(credentials);
    const { user, token } = response.data;

    // Dispatch login success action
    dispatch({
        type: LOGIN_SUCCESS,
        payload: { user, token },
    });

    // Save token to localStorage (for web) or AsyncStorage (for mobile)
    // For web
    localStorage.setItem('token', token);

    // For mobile (uncomment if using React Native)
    //AsyncStorage.setItem('token', token);


   } catch (error) {
    console.error('Login failed', error);
    throw error;
   }
};

// Logout action

export const logout = () => (dispatch) =>{
   // Remove token from storage
   localStorage.removeItem('token'); // For web
   //AsyncStorage.removeItem('token'); // For mobile (uncomment if using React Native)

   // Dispatch logout action
   dispatch({type: LOGOUT});
};

// Register action
export const register = (userData) => async (dispatch) =>{
  try {
    // Call the register API
    const response = await registerUser(userData);
    const { user, token } = response.data;

    // Dispatch login success action (auto-login after registration)
    dispatch({
        type: LOGIN_SUCCESS,
        payload: {user, token},
    });

   // Save token to localStorage (for web) or AsyncStorage (for mobile)
    // For web
    localStorage.setItem('token', token);

    // For mobile (uncomment if using React Native)
    //AsyncStorage.setItem('token', token);
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
};