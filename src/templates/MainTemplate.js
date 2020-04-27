import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import { withRouter } from 'react-router-dom';
import GlobalStyle from 'theme/GlobalStyle';
import { theme } from 'theme/mainTheme';
import { PageContext } from 'context';
import { pageTypes } from 'utils';

const MainTemplate = ({ children, location }) => {
  const [pageType, setPageType] = useState('');

  useEffect(() => {
    const { pathname } = location;

    const [currentPage] = pageTypes.filter(page => pathname.includes(page));
    if (currentPage !== undefined) setPageType(currentPage);
  }, [location]);

  return (
    <PageContext.Provider value={pageType}>
      <GlobalStyle />
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
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
