import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const auth = useSelector(state => state.firebase.auth);

  return (
    <Route
      {...rest}
      render={props =>
        !!auth.uid ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

ProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

ProtectedRoute.defaultProps = {
  location: '/',
};

export default ProtectedRoute;
