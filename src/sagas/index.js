import { all } from 'redux-saga/effects';
import { authSaga } from './authSaga';
import { usersSaga } from './usersSaga';

export default function*() {
  yield all([authSaga(), usersSaga()]);
}
