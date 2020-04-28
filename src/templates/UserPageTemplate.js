import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import NavHeader from 'components/organisms/NavHeader/NavHeader';

const UserPageTemplate = ({ children }) => (
  <>
    <Helmet>
      <title>Network</title>
    </Helmet>
    <NavHeader />
    {children}
  </>
);

UserPageTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserPageTemplate;
