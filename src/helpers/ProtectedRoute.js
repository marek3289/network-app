import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from 'helpers/Auth';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={props =>
        !!currentUser ? (
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
