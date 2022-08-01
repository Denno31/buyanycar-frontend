import {
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_SUCCESS,
} from "../constants/user";

export function userLoginReducer(state = {}, action) {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
    case USER_REGISTER_SUCCESS:
      return { ...state, userInfo: action.payload };
    case USER_LOGOUT:
      return null;
    default:
      return state;
  }
}
