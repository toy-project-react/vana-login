import { takeEvery, put, call } from 'redux-saga/effects';
import * as api from 'apis/service';
import * as authActions from 'modules/auth';
import {
  openPopup,
  showErrorMessage,
  requestApiCall,
  responseApiCall,
  catchError
} from 'modules/noti';

// login 관련 saga
export function* doLogin(action) {
  const { data } = action.payload;
  try {
    let result = yield call(api.requestLogin, { ...data });
    yield put(authActions.successLogin(result));
  } catch (e) {
    yield put(showErrorMessage(e.data.details));
    console.error(e);
  }
}

export function* registUser(action) {
  const { data, popup } = action.payload;
  try {
    yield put(requestApiCall());
    const result = yield call(api.registUser, { ...data });
    yield put(authActions.successRegistUser(result));
    yield put(openPopup({ ...popup }));
  } catch (e) {
    yield put(showErrorMessage(e.data.details));
    console.error(e);
  } finally {
    yield put(responseApiCall());
  }
}

export function* updateUser(action) {
  const { data, popup } = action.payload;
  try {
    yield put(requestApiCall());
    const result = yield call(api.updateUser, { ...data });
    yield put(
      authActions.successUpdateUser({
        ...action.payload,
        ...result,
        email: sessionStorage.getItem('email') || action.payload.email
      })
    );
    yield put(openPopup({ ...popup }));
  } catch (e) {
    yield put(showErrorMessage(e.data.details));
    if (data.isChange) {
      yield put(openPopup({ type: 'error', text: e.data.details }));
    }
    console.error(e);
  } finally {
    yield put(responseApiCall());
  }
}

export function* authSaga() {
  yield takeEvery(authActions.requestLogin, doLogin);
  yield takeEvery(authActions.requestRegistUser, registUser);
  yield takeEvery(authActions.requestUpdateUser, updateUser);
}
