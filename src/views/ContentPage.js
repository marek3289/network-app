import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ContentTemplate from 'templates/ContentTemplate';
import Thread from 'components/organisms/Thread/Thread';
import { filterItems } from 'utils';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { PageContext } from 'context';

const ContentPage = ({ threads }) => {
  const pageType = useContext(PageContext);
  const pageThreads = threads.filter(item => item.itemType === pageType);

  return (
    <ContentTemplate>
      {([searchValue, activeTag]) => (
        <>
          {pageThreads &&
            filterItems(pageThreads, searchValue, activeTag).map(thread => (
              <Thread key={thread.id} pageType={thread.itemType} {...thread} />
            ))}
        </>
      )}
    </ContentTemplate>
  );
};

ContentPage.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.object),
};

ContentPage.defaultProps = {
  threads: [],
};

const mapStateToProps = state => ({ threads: state.firestore.ordered.threads });

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: 'threads' }]),
)(ContentPage);
