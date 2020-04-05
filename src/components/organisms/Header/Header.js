import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Modal from 'components/organisms/Modal/Modal';
import Heading from 'components/atoms/Heading/Heading';
import Input from 'components/atoms/Input/Input';
import { signOutAction } from 'actions';
import { capitalize } from 'utils';

const StyledWrapper = styled.header`
  width: 100%;
  height: 60px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 75px;

  @media (max-width: 700px) {
    padding: 0 50px;
    padding-top: 10px;
  }

  @media (max-width: 450px) {
    padding: 0 20px;
  }
`;

const StyledHeading2 = styled(Heading)`
  font-size: ${({ theme }) => theme.fontSize.l};
  text-align: end;
  text-decoration: underline;
  text-underline-position: under;
  width: 250px;
  cursor: pointer;
`;

const Header = ({
  match,
  pageType,
  isThreadPage,
  signOut,
  searchValue,
  handleSearch,
}) => {
  const [isModalOpen, setModal] = useState(false);

  const handleSignout = () => {
    setModal(false);
    signOut();
  };

  return (
    <>
      {pageType === 'user' ? (
        <StyledWrapper>
          {pageType && (
            <>
              <Heading big>Threads by {match.params.id}</Heading>
              <StyledHeading2 onClick={() => setModal(true)}>
                Logout
              </StyledHeading2>
              {isModalOpen && (
                <Modal
                  popout
                  setModal={setModal}
                  handleAction={handleSignout}
                />
              )}
            </>
          )}
        </StyledWrapper>
      ) : (
        <StyledWrapper>
          {pageType && (
            <>
              <Heading big>{capitalize(pageType)}</Heading>
              {isThreadPage ? (
                <StyledHeading2 as={Link} to={`/${pageType}`}>
                  Back to {pageType}
                </StyledHeading2>
              ) : (
                <Input
                  search
                  value={searchValue}
                  onChange={handleSearch}
                  placeholder={`Search in ${pageType}`}
                />
              )}
            </>
          )}
        </StyledWrapper>
      )}
    </>
  );
};

Header.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  pageType: PropTypes.string,
  searchValue: PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired,
  isThreadPage: PropTypes.bool,
  signOut: PropTypes.func.isRequired,
};

Header.defaultProps = {
  pageType: 'forum',
  isThreadPage: false,
};

const mapDispatchToProps = dispatch => ({
  signOut: () => dispatch(signOutAction()),
});

export default connect(null, mapDispatchToProps)(withRouter(Header));
