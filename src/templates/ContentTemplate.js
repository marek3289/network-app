import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserPageTemplate from 'templates/UserPageTemplate';
import UserProfileCard from 'components/organisms/UserProfileCard/UserProfileCard';
import Sidebar from 'components/organisms/Sidebar/Sidebar';
import Header from 'components/organisms/Header/Header';
import { PageContext } from 'context';

const StyledWrapper = styled.main`
  padding: 0 75px;
  display: flex;
  justify-content: space-between;
  margin: 20px 0;

  @media (max-width: 700px) {
    flex-direction: column-reverse;
    padding: 0 50px;
  }

  @media (max-width: 450px) {
    padding: 0 25px;
  }
`;

const StyledThreads = styled.div`
  width: 100%;
  margin-right: 20px;
`;

const ContentTemplate = ({
  children,
  match,
  userId,
  searchValue,
  setSearchValue,
  activeTag,
  setActiveTag,
}) => {
  const { username } = useSelector(state => state.firebase.profile);
  const pageType = useContext(PageContext);
  const isThreadsPage = match.path.includes(':id');

  const handleSearch = e => setSearchValue(e.target.value);

  return (
    <UserPageTemplate>
      <Header
        isThreadPage={isThreadsPage}
        pageType={pageType}
        searchValue={searchValue}
        handleSearch={handleSearch}
      />
      <StyledWrapper>
        <StyledThreads>{children}</StyledThreads>
        {pageType === 'user' ? (
          <UserProfileCard userId={userId} loggedUser={username} />
        ) : (
          <Sidebar activeTag={activeTag} setActiveTag={setActiveTag} />
        )}
      </StyledWrapper>
    </UserPageTemplate>
  );
};

ContentTemplate.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
  }).isRequired,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.array]),
  userId: PropTypes.string,
  searchValue: PropTypes.string,
  activeTag: PropTypes.string,
  setSearchValue: PropTypes.func,
  setActiveTag: PropTypes.func,
};

ContentTemplate.defaultProps = {
  children: null,
  userId: null,
  searchValue: '',
  activeTag: 'All',
  setSearchValue: null,
  setActiveTag: null,
};

export default withRouter(ContentTemplate);
