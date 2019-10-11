import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

// login
const REQUEST_LOGIN = '@auth/REQUEST_LOGIN';
const SUCCESS_LOGIN = '@auth/SUCCESS_LOGIN';
const FAILURE_LOGIN = '@auth/FAILURE_LOGIN';
const REQUEST_LOGOUT = '@auth/REQUEST_LOGOUT';
const SUCCESS_LOGOUT = '@auth/SUCCESS_LOGOUT';

const REQUEST_REGIST_USER = '@auth/REQUEST_REGIST_USER';
const SUCCESS_REGIST_USER = '@auth/SUCCESS_REGIST_USER';
const REQUEST_UPDATE_USER = '@users/REQUEST_UPDATE_USER';
const SUCCESS_UPDATE_USER = '@users/SUCCESS_UPDATE_USER';

export const requestLogin = createAction(REQUEST_LOGIN);
export const successLogin = createAction(SUCCESS_LOGIN);
export const loginFailured = createAction(FAILURE_LOGIN);
export const requestLogout = createAction(REQUEST_LOGOUT);
export const successLogout = createAction(SUCCESS_LOGOUT);

export const requestRegistUser = createAction(REQUEST_REGIST_USER);
export const successRegistUser = createAction(SUCCESS_REGIST_USER);

export const requestUpdateUser = createAction(REQUEST_UPDATE_USER);
export const successUpdateUser = createAction(SUCCESS_UPDATE_USER);

const initialState = {
  // auth
  code: sessionStorage.getItem('code') || '',
  email: sessionStorage.getItem('email') || '',
  authentication: sessionStorage.getItem('authentication') ? true : false,
  userInfo: JSON.parse(sessionStorage.getItem('userInfo')) || {},
  token: sessionStorage.getItem('token') || ''
};

export default handleActions(
  {
    [SUCCESS_LOGIN]: (state, action) =>
      produce(state, draft => {
        draft.authentication = true;
        draft.userInfo = action.payload;
        draft.email = action.payload.email;
        draft.token = action.payload.token;
        sessionStorage.setItem('authentication', true);
        sessionStorage.setItem('token', draft.token);
        sessionStorage.setItem('email', draft.email);
        sessionStorage.setItem('userInfo', JSON.stringify(draft.userInfo));
      }),
    [FAILURE_LOGIN]: (state, action) => produce(state, draft => {}),
    [REQUEST_LOGOUT]: (state, action) =>
      produce(state, draft => {
        draft.authentication = false;
        sessionStorage.removeItem('authentication');
        sessionStorage.removeItem('code');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('userInfo');
      }),
    [SUCCESS_REGIST_USER]: (state, action) =>
      produce(state, draft => {
        draft.isRegisted = true;
      }),
    [SUCCESS_UPDATE_USER]: (state, action) =>
      produce(state, draft => {
        draft.email = action.payload.email;
        draft.code = action.payload.code;
        sessionStorage.setItem('email', draft.email);
        sessionStorage.setItem('code', draft.code);
      })
  },
  initialState
);
