import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import ContentTemplate from 'templates/ContentTemplate';
import Thread from 'components/organisms/Thread/Thread';
import Loader from 'components/atoms/Loader/Loader';
import Heading from 'components/atoms/Heading/Heading';
import { filterItems } from 'utils';
import { PageContext } from 'context';

const StyledHeading = styled.div`
  display: flex;
  justify-content: center;
`;

const ContentPage = () => {
  useFirestoreConnect([
    { collection: 'threads', orderBy: ['createdAt', 'desc'] },
  ]);
  const threads = useSelector(state => state.firestore.ordered.threads);

  const [isLoading, setLoading] = useState(true);
  const [threadList, setThreadList] = useState([]);
  const pageType = useContext(PageContext);

  useEffect(() => {
    if (threads) {
      const pageThreads = threads.filter(item => item.itemType === pageType);
      setLoading(false);
      setThreadList(pageThreads);
    }
  }, [threads, pageType]);

  return (
    <ContentTemplate>
      {([searchValue, activeTag]) => (
        <>
          {!threadList.length && !isLoading ? (
            <StyledHeading>
              <Heading bold>Sorry, there is no posts yet</Heading>
            </StyledHeading>
          ) : (
            filterItems(threadList, searchValue, activeTag).map(thread => (
              <Thread key={thread.id} pageType={thread.itemType} {...thread} />
            ))
          )}
          {isLoading && <Loader />}
        </>
      )}
    </ContentTemplate>
  );
};

export default ContentPage;
