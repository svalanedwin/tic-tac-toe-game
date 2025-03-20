import { LOGIN_SUCCESS, LOGOUT, LOAD_USER } from '../actions/authActions';

const initialState = {
  user: null,
  token: localStorage.getItem('token') || null, // ✅ Keep token even after refresh
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, user: action.payload.user, token: action.payload.token };
    case LOAD_USER:
      return { ...state, user: action.payload }; // ✅ Load user from token
    case LOGOUT:
      return { user: null, token: null };
    default:
      return state;
  }
};

export default authReducer;
