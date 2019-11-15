import * as api from 'apis/service';
import * as usersActions from 'modules/users';

// 등록 & 사용자 setting 페이지 관련 사이드 이펙트 정의
import { call, put, takeEvery } from 'redux-saga/effects';
import { catchError, requestApiCall, responseApiCall } from 'modules/noti';

export function* fetchUsers(action) {
  const { data } = action.payload;
  try {
    yield put(requestApiCall());
    const result = yield call(api.getUserList, { ...data });

    yield put(usersActions.successFetchUsers(result));
  } catch (e) {
    yield put(catchError({ data: e, popup: { type: 'error' } }));
    console.error(e);
  } finally {
    yield put(responseApiCall());
  }
}

export function* fetchUserInfo(action) {
  const { data } = action.payload;
  try {
    yield put(requestApiCall());
    const result = yield call(api.getUserInfo, { ...data });

    yield put(usersActions.successFetchUserInfo(result));
  } catch (e) {
    yield put(catchError({ data: e, popup: { type: 'error' } }));
    console.error(e);
  } finally {
    yield put(responseApiCall());
  }
}

export function* usersSaga() {
  yield takeEvery(usersActions.requestFetchUsers, fetchUsers);
  yield takeEvery(usersActions.requestFetchUserInfo, fetchUserInfo);
}
