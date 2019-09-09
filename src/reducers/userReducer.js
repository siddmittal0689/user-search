import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_USER_SUCCESS:
      return {...state, users: action.users};
    case types.SHOW_LOADER:
      return {...state, showLoader: action.data};
    default:
      return state;
  }
}
