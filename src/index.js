import 'element-theme-default';
import 'assets/styles/index.scss';
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/ie11';

import { applyMiddleware, createStore } from 'redux';

import App from 'router';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { i18n } from 'element-react';
import locale from 'element-react/src/locale/lang/ko';
import rootReducer from 'modules';
import rootSaga from 'sagas';

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
