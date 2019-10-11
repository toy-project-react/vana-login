import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

const OPEN_POPUP = '@noti/OPEN_POPUP';
const CLOSE_POPUP = '@noti/CLOSE_POPUP';
const ERROR_MESSAGE = '@noti/ERROR_MESSAGE';
const RESET_ERROR = '@noti/RESET_ERROR';
const REQUEST_API_CALL = '@noti/REQUEST_API_CALL';
const RESPONSE_API_CALL = '@noti/RESPONSE_API_CALL';
const FAILURE_RESPONSE = '@noti/FAILURE_RESPONSE';

// pagination
const CHANGE_INIT = '@noti/CHANGE_INIT';
const CHANGE_LIMIT_OFFSET = '@noti/CHANGE_LIMIT_OFFSET';
const CHANGE_CURRENT = '@noti/CHANGE_CURRENT';
const CHANGE_START_END = '@noti/CHANGE_START_END';

export const openPopup = createAction(OPEN_POPUP);
export const closePopup = createAction(CLOSE_POPUP);
export const showErrorMessage = createAction(ERROR_MESSAGE);
export const resetError = createAction(RESET_ERROR);
export const requestApiCall = createAction(REQUEST_API_CALL);
export const responseApiCall = createAction(RESPONSE_API_CALL);
export const catchError = createAction(FAILURE_RESPONSE);

export const changeInit = createAction(CHANGE_INIT);
export const changeLimitOffset = createAction(CHANGE_LIMIT_OFFSET);
export const changeCurrent = createAction(CHANGE_CURRENT);
export const changeStartEnd = createAction(CHANGE_START_END);

const initialState = {
  isOpenPopup: false,
  popup: null,
  error: {
    isError: false,
    message: ''
  },
  loading: false,
  params: {
    limit: 50,
    offset: 0
  },
  pagination: {
    start: 0,
    end: 5,
    current: 1
  },
  notFound: null
};

export default handleActions(
  {
    [OPEN_POPUP]: (state, action) =>
      produce(state, draft => {
        draft.isOpenPopup = true;
        draft.popup = action.payload;
      }),
    [CLOSE_POPUP]: (state, action) =>
      produce(state, draft => {
        draft.isOpenPopup = false;
      }),
    [ERROR_MESSAGE]: (state, action) =>
      produce(state, draft => {
        draft.error.isError = true;
        draft.error.message = action.payload;
      }),
    [RESET_ERROR]: (state, action) =>
      produce(state, draft => {
        draft.error.isError = false;
        draft.error.message = '';
      }),
    [REQUEST_API_CALL]: (state, action) =>
      produce(state, draft => {
        draft.loading = true;
        draft.notFound = false;
      }),
    [RESPONSE_API_CALL]: (state, action) =>
      produce(state, draft => {
        draft.loading = false;
      }),
    [FAILURE_RESPONSE]: (state, action) =>
      produce(state, draft => {
        console.log('FAILURE_RESPONSE', action.payload.data);
        if (action.payload.data.status === 404) {
          draft.notFound = true;
        }
        if (action.payload.data.status === 406 && action.payload.popup) {
          draft.popup = action.payload.popup;
          draft.isOpenPopup = true;
        }
        draft.error = {
          isError: true,
          message: action.payload.data.data.details
        };
      }),
    [CHANGE_INIT]: (state, action) =>
      produce(state, draft => {
        draft.notFound = null;
        draft.params = {
          limit: 50,
          offset: 0
        };
        draft.pagination = {
          start: 0,
          end: 5,
          current: 1
        };
      }),
    [CHANGE_LIMIT_OFFSET]: (state, action) =>
      produce(state, draft => {
        draft.params = action.payload;
      }),
    [CHANGE_CURRENT]: (state, action) =>
      produce(state, draft => {
        draft.pagination.current = action.payload.current;
      }),
    [CHANGE_START_END]: (state, action) =>
      produce(state, draft => {
        draft.pagination.start = action.payload.start;
        draft.pagination.end = action.payload.end;
      })
  },
  initialState
);
