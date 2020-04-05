import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import firebase from 'fbConfig';

export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(setCurrentUser);
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default AuthProvider;
