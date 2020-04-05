import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import ThreadTemplate from 'templates/ThreadTemplate';
import { PageContext } from 'context';

const ThreadPage = ({ activeItem, comments, match, loggedUser }) => {
  const pageType = useContext(PageContext);
  const threadId = match.params.id;

  return (
    <>
      {activeItem && comments && (
        <ThreadTemplate
          pageType={pageType}
          threadId={threadId}
          comments={comments}
          loggedUser={loggedUser}
          {...activeItem}
        />
      )}
    </>
  );
};

ThreadPage.propTypes = {
  activeItem: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  comments: PropTypes.arrayOf(PropTypes.object),
  match: PropTypes.shape({
    params: PropTypes.object,
  }).isRequired,
  loggedUser: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.bool,
  ]).isRequired,
};

ThreadPage.defaultProps = {
  activeItem: null,
  comments: [],
};

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { threads } = state.firestore.data;
  const thread = threads ? threads[id] : null;

  return {
    activeItem: thread,
    comments: state.firestore.ordered.comments,
    loggedUser: state.firebase.profile,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: 'threads' }]),
  firestoreConnect([{ collection: 'comments' }]),
)(ThreadPage);
