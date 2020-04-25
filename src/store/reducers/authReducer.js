import { authActions } from 'store/constants';

const {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  SIGNOUT_SUCCESS,
  UPDATE_PROFILE,
  UPDATE_PROFILE_ERROR,
} = authActions;

const initialState = {
  authError: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        authError: null,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        authError: action.err.message,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        authError: null,
      };
    case SIGNUP_ERROR:
      return {
        ...state,
        authError: action.err.message,
      };
    case SIGNOUT_SUCCESS:
      return {
        state,
      };
    case UPDATE_PROFILE:
      return {
        state,
      };
    case UPDATE_PROFILE_ERROR:
      return {
        state,
      };
    default:
      return state;
  }
};

export default authReducer;
