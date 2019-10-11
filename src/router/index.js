import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { FullSizeLayout, DefaultLayout } from 'components/layouts';
import { NotFound } from 'pages';
import PrivateRoute from './PrivateRoute';
import NotificationContainer from 'containers/NotificationContainer';
import Dashboard from 'containers/Dashboard';
import Users from 'containers/Users';
import Login from 'containers/Login';
import Join from 'containers/Join';

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
