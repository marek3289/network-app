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
import firebase from 'fbConfig';
import { createFirestoreInstance } from 'redux-firestore';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import AuthIsLoaded from 'helpers/AuthIsLoaded';

const rrfProps = {
  firebase,
  config: {
    userProfile: 'users',
    useFirestoreForProfile: true,
  },
  dispatch: store.dispatch,
  createFirestoreInstance,
};

const Root = () => (
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <BrowserRouter>
        <AuthIsLoaded>
          <MainTemplate>
            <Switch>
              <Route
                exact
                path={routes.home}
                render={() => <Redirect to="/forum" />}
              />
              <Route exact path={routes.login} component={AuthPage} authPage />
              <Route
                exact
                path={routes.register}
                component={AuthPage}
                authPage
              />
              <ProtectedRoute
                exact
                path={routes.user}
                component={UserProfilePage}
              />
              <ProtectedRoute
                exact
                path={routes.forum}
                component={ContentPage}
              />
              <ProtectedRoute
                exact
                path={routes.forumPage}
                component={ContentPage}
              />
              <ProtectedRoute
                exact
                path={routes.forumThread}
                component={ThreadPage}
              />
              <ProtectedRoute
                exact
                path={routes.updates}
                component={ContentPage}
              />
              <ProtectedRoute
                exact
                path={routes.updatesPage}
                component={ContentPage}
              />
              <ProtectedRoute
                exact
                path={routes.update}
                component={ThreadPage}
              />
              <ProtectedRoute
                exact
                path={routes.jobs}
                component={ContentPage}
              />
              <ProtectedRoute
                exact
                path={routes.jobsPage}
                component={ContentPage}
              />
              <ProtectedRoute exact path={routes.job} component={ThreadPage} />
            </Switch>
          </MainTemplate>
        </AuthIsLoaded>
      </BrowserRouter>
    </ReactReduxFirebaseProvider>
  </Provider>
);

export default Root;
