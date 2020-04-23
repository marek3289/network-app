import React from 'react';
import { useSelector } from 'react-redux';
import { isLoaded } from 'react-redux-firebase';
import LoadingPage from 'views/LoadingPage';

const AuthIsLoaded = ({ children }) => {
  const auth = useSelector(state => state.firebase.auth);

  if (!isLoaded(auth)) return <LoadingPage />;
  return children;
};

export default AuthIsLoaded;
