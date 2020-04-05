import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import { withRouter } from 'react-router-dom';
import AuthProvider from 'helpers/Auth';
import GlobalStyle from 'theme/GlobalStyle';
import { theme } from 'theme/mainTheme';
import { PageContext } from 'context';

const MainTemplate = ({ children, location }) => {
  const [pageType, setPageType] = useState('');

  useEffect(() => {
    const pageTypes = ['forum', 'updates', 'jobs', 'login', 'register', 'user'];
    const { pathname } = location;

    const [currentPage] = pageTypes.filter(page => pathname.includes(page));
    setPageType(currentPage);
  }, [location]);

  return (
    <PageContext.Provider value={pageType}>
      <AuthProvider>
        <GlobalStyle />
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </AuthProvider>
    </PageContext.Provider>
  );
};

MainTemplate.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default withRouter(MainTemplate);
