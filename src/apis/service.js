import api from 'apis';
import apiUri from 'apis/apiUris';

// auth
export const requestLogin = payload => api(apiUri.auth.login, 'post', payload);
// 관리자가 운영자 등록
export const registUser = payload => api(apiUri.auth.regist, 'post', payload);

// users
export const getUserList = payload => api(apiUri.users.list, 'get', payload);
export const getUserInfo = payload =>
  api(apiUri.users.info(payload.email), 'get', payload);
// 운영자가 메일을 통해 정보 업데이트
export const updateUser = payload => api(apiUri.users.update, 'put', payload);
export const changePassword = payload =>
  api(apiUri.users.changePassword, 'post', payload);
