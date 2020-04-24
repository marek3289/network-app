import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Modal from 'components/organisms/Modal/Modal';
import Heading from 'components/atoms/Heading/Heading';
import Input from 'components/atoms/Input/Input';
import { signOutAction } from 'store/actions/authActions';
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

const StyledHeading = styled(Heading)`
  font-size: ${({ theme }) => theme.fontSize.l};
  text-align: end;
  text-decoration: underline;
  text-underline-position: under;
  width: 250px;
  cursor: pointer;
`;

const Header = ({ pageType, isThreadPage, searchValue, handleSearch }) => {
  const dispatch = useDispatch();
  const signOut = useCallback(() => dispatch(signOutAction()), [dispatch]);
  const [isModalOpen, setModal] = useState(false);
  const { id } = useParams();

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
              <Heading big>Threads by {id}</Heading>
              <StyledHeading onClick={() => setModal(true)}>
                Logout
              </StyledHeading>
              {isModalOpen && (
                <Modal
                  popout
                  action="logout"
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
                <StyledHeading as={Link} to={`/${pageType}`}>
                  Back to {pageType}
                </StyledHeading>
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
  pageType: PropTypes.string,
  searchValue: PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired,
  isThreadPage: PropTypes.bool,
};

Header.defaultProps = {
  pageType: 'forum',
  isThreadPage: false,
};

export default Header;
