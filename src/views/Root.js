import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import AuthPage from 'views/AuthPage';
import UserProfilePage from 'views/UserProfilePage';
import ContentPage from 'views/ContentPage';
import ThreadPage from 'views/ThreadPage';
import MainTemplate from 'templates/MainTemplate';
import ProtectedRoute from 'helpers/ProtectedRoute';
import store from 'store';
import { routes } from 'routes';

const Root = () => (
  <Provider store={store}>
    <BrowserRouter>
      <MainTemplate>
        <Switch>
          <Route
            exact
            path={routes.home}
            render={() => <Redirect to="/forum" />}
          />
          <Route exact path={routes.login} component={AuthPage} authPage />
          <Route exact path={routes.register} component={AuthPage} authPage />
          <ProtectedRoute
            exact
            path={routes.user}
            component={UserProfilePage}
          />
          <ProtectedRoute exact path={routes.forum} component={ContentPage} />
          <ProtectedRoute
            exact
            path={routes.forumThread}
            component={ThreadPage}
          />
          <ProtectedRoute exact path={routes.updates} component={ContentPage} />
          <ProtectedRoute exact path={routes.update} component={ThreadPage} />
          <ProtectedRoute exact path={routes.jobs} component={ContentPage} />
          <ProtectedRoute exact path={routes.job} component={ThreadPage} />
        </Switch>
      </MainTemplate>
    </BrowserRouter>
  </Provider>
);

export default Root;
