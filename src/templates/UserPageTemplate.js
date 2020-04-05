import React from 'react';
import PropTypes from 'prop-types';
import NavHeader from 'components/organisms/NavHeader/NavHeader';

const UserPageTemplate = ({ children }) => (
  <>
    <NavHeader />
    {children}
  </>
);

UserPageTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserPageTemplate;
