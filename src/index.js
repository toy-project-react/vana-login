import React from 'react';
import ReactDOM from 'react-dom';
import App from 'router';
import { i18n } from 'element-react';
import locale from 'element-react/src/locale/lang/ko';
import 'element-theme-default';
import rootReducer from 'modules';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from 'sagas';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import 'assets/styles/index.scss';

import 'react-app-polyfill/ie9';
import 'react-app-polyfill/ie11';

i18n.use(locale);

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
