import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Navigation from 'components/molecules/Navigation/Navigation';
import Heading from 'components/atoms/Heading/Heading';
import Avatar from 'components/atoms/Avatar/Avatar';

const StyledWrapper = styled.nav`
  width: 100%;
  height: 60px;
  background-color: white;
  padding: 0 75px;
  border-bottom: 1px solid ${({ theme }) => theme.gray100};
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > * {
    width: 30%;
  }

  @media (max-width: 700px) {
    height: 80px;
    margin-top: 5px;
    padding: 0 50px;
    align-items: flex-start;
  }

  @media (max-width: 450px) {
    padding: 0 20px;
  }
`;

const StyledLogo = styled.span`
  font-size: 28px;
  font-weight: ${({ theme }) => theme.bold};
  text-decoration: none;
  color: black;
`;

const StyledHeading = styled(Heading)`
  margin-left: 7px;
`;

const StyledUserProfile = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  text-decoration: none;
  transition: all 0.1s ease-in-out;

  &:hover {
    text-decoration: underline;
    filter: brightness(90%);
  }
`;

const NavHeader = ({ profile }) => (
  <StyledWrapper>
    <StyledLogo as={Link} to="/">
      Network
    </StyledLogo>
    <Navigation />
    <StyledUserProfile as={Link} to={`/user/${profile.username}`}>
      <Avatar src={profile.avatarSrc} />
      <StyledHeading>{profile.username}</StyledHeading>
    </StyledUserProfile>
  </StyledWrapper>
);

NavHeader.propTypes = {
  profile: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.bool,
  ]).isRequired,
};

const mapStateToProps = state => ({ profile: state.firebase.profile });

export default connect(mapStateToProps)(NavHeader);
