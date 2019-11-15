import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { DefaultLayout, FullSizeLayout } from 'components/layouts';
import React, { Component } from 'react';

import Dashboard from 'containers/Dashboard';
import Join from 'containers/Join';
import Login from 'containers/Login';
import { NotFound } from 'pages';
import NotificationContainer from 'containers/NotificationContainer';
import PrivateRoute from './PrivateRoute';
import Users from 'containers/Users';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <NotificationContainer />
        <Switch>
          <Route exact path="/login">
            <FullSizeLayout page={Login}></FullSizeLayout>
          </Route>
          <Route exact path="/join">
            <FullSizeLayout page={Join}></FullSizeLayout>
          </Route>
          <DefaultLayout>
            <Switch>
              <Route
                exact
                path="/"
                render={() => <Redirect replace to="/dashboard" />}
              />
              <PrivateRoute exact path="/dashboard" page={Dashboard} />
              <PrivateRoute path="/users" page={Users} />
              <Route component={NotFound} />
            </Switch>
          </DefaultLayout>
        </Switch>
      </BrowserRouter>
    );
  }
}
