import { LOGIN_SUCCESS, LOGOUT } from '../actions/authActions'

// Initial state for authentication
const initialState = {
    user: null, // Stores the logged-in user's details
    token: null, // Stores the JWT token
}

// Auth reducer
const authReducer = (state = initialState, action) =>{
  switch (action.type) {
    case LOGIN_SUCCESS:
        return{
            ...state,
            user: action.payload.user, // Update user details
            token: action.payload.token, // Update token
        };
    case LOGOUT:
        return {
            ...state.token,
            user: null, // Clear user details
            token: null, // Update token

        };   
  
    default:
       return state; // Return current state for unknown actions
  }
};

export default authReducer;