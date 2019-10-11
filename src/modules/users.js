import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

const FETCH_USERS = '@users/FETCH_USERS';
const FETCH_USERINFO = '@users/FETCH_USERINFO';
const SUCCESS_FETCH_USERS = '@users/SUCCESS_FETCH_USERS';
const SUCCESS_FETCH_USERINFO = '@users/SUCCESS_FETCH_USERINFO';

export const requestFetchUsers = createAction(FETCH_USERS);
export const requestFetchUserInfo = createAction(FETCH_USERINFO);

export const successFetchUsers = createAction(SUCCESS_FETCH_USERS);
export const successFetchUserInfo = createAction(SUCCESS_FETCH_USERINFO);

const initialState = {
  userList: null,
  userDetail: null
};

export default handleActions(
  {
    [SUCCESS_FETCH_USERS]: (state, action) =>
      produce(state, draft => {
        draft.userList = action.payload;
      }),
    [SUCCESS_FETCH_USERINFO]: (state, action) =>
      produce(state, draft => {
        draft.userDetail = action.payload;
      })
  },
  initialState
);
