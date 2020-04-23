import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import ContentTemplate from 'templates/ContentTemplate';
import Thread from 'components/organisms/Thread/Thread';
import Loader from 'components/atoms/Loader/Loader';
import Heading from 'components/atoms/Heading/Heading';

const StyledHeading = styled.div`
  display: flex;
  justify-content: center;
`;

const UserProfilePage = ({ match }) => {
  useFirestoreConnect([
    { collection: 'threads', limit: 5, orderBy: ['createdAt', 'desc'] },
  ]);
  const loggedUser = useSelector(state => state.firebase.profile.username);
  const threads = useSelector(state => state.firestore.ordered.threads);

  const { id } = match.params;
  const [isLoading, setLoading] = useState(true);
  const [threadList, setThreadList] = useState([]);

  useEffect(() => {
    if (threads) {
      const userThreads = threads.filter(thread => thread.author === id);
      setLoading(false);
      setThreadList(userThreads);
    }
  }, [threads, id]);

  return (
    <ContentTemplate userId={id} loggedUser={loggedUser}>
      {!threadList.length && !isLoading ? (
        <StyledHeading>
          <Heading bold>This user has no posts yet.</Heading>
        </StyledHeading>
      ) : (
        threadList.map(thread => (
          <Thread key={thread.id} pageType={thread.itemType} {...thread} />
        ))
      )}
      {isLoading && <Loader />}
    </ContentTemplate>
  );
};

UserProfilePage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),
};

UserProfilePage.defaultProps = {
  match: undefined,
};

export default UserProfilePage;
