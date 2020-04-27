import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import ContentTemplate from 'templates/ContentTemplate';
import Thread from 'components/organisms/Thread/Thread';
import Pagination from 'components/molecules/Pagination/Pagination';
import Loader from 'components/atoms/Loader/Loader';
import Heading from 'components/atoms/Heading/Heading';
import { usePagination } from 'hooks/usePagination';
import { filterItems } from 'utils';
import { PageContext } from 'context';

const StyledHeading = styled.div`
  display: flex;
  justify-content: center;
`;

const ContentPage = ({ match }) => {
  useFirestoreConnect([
    { collection: 'threads', orderBy: ['createdAt', 'desc'] },
  ]);
  const threads = useSelector(state => state.firestore.ordered.threads);

  const [searchValue, setSearchValue] = useState('');
  const [activeTag, setActiveTag] = useState('All');

  const pageType = useContext(PageContext);
  const [pageThreads, setPageThreads] = useState(null);

  useEffect(() => {
    if (threads) {
      const filteredList = threads.filter(item => item.itemType === pageType);
      setPageThreads(filterItems(filteredList, searchValue, activeTag));
    }
  }, [threads, pageType, searchValue, activeTag]);

  const { page } = match.params;
  const currentPage = !page ? 1 : page;
  const { threadList, isLoading } = usePagination(
    pageThreads,
    pageType,
    currentPage,
    5,
  );

  return (
    <ContentTemplate
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      activeTag={activeTag}
      setActiveTag={setActiveTag}
    >
      {!threadList.length && !isLoading ? (
        <StyledHeading>
          <Heading bold>Sorry, there is no posts yet</Heading>
        </StyledHeading>
      ) : (
        threadList.map(thread => (
          <Thread key={thread.id} pageType={thread.itemType} {...thread} />
        ))
      )}
      {isLoading && <Loader />}
      {!isLoading && (
        <Pagination
          postPerPage={5}
          totalThreads={pageThreads && pageThreads.length}
          currentPage={currentPage}
          pageType={pageType}
        />
      )}
    </ContentTemplate>
  );
};

ContentPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      page: PropTypes.string,
    }),
  }).isRequired,
};

export default ContentPage;
