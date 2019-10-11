const API_PREFIX = 'api/v2';
const config = {
  auth: {
    login: `${API_PREFIX}/auth/login`,
    regist: `${API_PREFIX}/auth/register`
  },
  users: {
    list: `${API_PREFIX}/users/`,
    update: `${API_PREFIX}/users/profile`,
    info: email => `${API_PREFIX}/users/profile/${email}`,
    changePassword: `${API_PREFIX}/users/change-password`
  }
};

export default config;
