import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './auth';
import noti from './noti';
import users from './users';
const rootReducer = combineReducers({
  auth,
  noti,
  users,
  form: formReducer
});

export default rootReducer;
