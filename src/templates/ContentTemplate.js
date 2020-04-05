import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import UserPageTemplate from 'templates/UserPageTemplate';
import Sidebar from 'components/organisms/Sidebar/Sidebar';
import Header from 'components/organisms/Header/Header';
import { PageContext } from 'context';
import UserProfileCard from 'components/organisms/UserProfileCard/UserProfileCard';
import Thread from 'components/organisms/Thread/Thread';

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
  userThreads,
  loggedUser,
  userId,
}) => {
  const pageType = useContext(PageContext);
  const [searchValue, setSearchValue] = useState('');
  const [activeTag, setActiveTag] = useState('All');
  const isThreadPage = match.path.includes(':id');

  const handleSearch = e => setSearchValue(e.target.value);

  return (
    <UserPageTemplate>
      <Header
        isThreadPage={isThreadPage}
        pageType={pageType}
        searchValue={searchValue}
        handleSearch={handleSearch}
      />
      <StyledWrapper>
        {pageType === 'user' ? (
          <>
            <StyledThreads>
              {userThreads &&
                userThreads.map(thread => (
                  <Thread
                    key={thread.id}
                    pageType={thread.itemType}
                    {...thread}
                  />
                ))}
            </StyledThreads>
            <UserProfileCard userId={userId} loggedUser={loggedUser} />
          </>
        ) : (
          <>
            <StyledThreads>
              {isThreadPage ? children : children([searchValue, activeTag])}
            </StyledThreads>
            <Sidebar activeTag={activeTag} setActiveTag={setActiveTag} />
          </>
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
  userThreads: PropTypes.arrayOf(PropTypes.object),
  loggedUser: PropTypes.string,
  userId: PropTypes.string,
};

ContentTemplate.defaultProps = {
  userThreads: undefined,
  children: null,
  loggedUser: null,
  userId: null,
};

export default withRouter(ContentTemplate);
