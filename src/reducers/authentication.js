import { LOGIN_SUCCESS, GET_USER, LOGOUT, REGISTER_SUCCESS, ALERT } from '../actions/types';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user, currentUser:{}, alert:false } : {};

export default function authentication(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
          ...state,
        loggedIn: true,
        user: action.payload,
        currentUser: action.payload
      };
    case GET_USER:
        return {
            state
        };
    case LOGOUT:
        return {
            ...state,
            loggedIn: true,
            user: {}
        };
    case REGISTER_SUCCESS:
        return {
        ...state,
        loggedIn: true,
        user: action.payload
        };
    case ALERT:
          return {
          ...state,
          alert: action.payload
          };
    default:
      return state
  }
}