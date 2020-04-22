import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import ThreadTemplate from 'templates/ThreadTemplate';
import { PageContext } from 'context';

const ThreadPage = ({ thread, comments, match, loggedUser }) => {
  const [activeThread, setActiveThread] = useState(null);
  const [threadComments, setThreadComments] = useState(null);

  const pageType = useContext(PageContext);
  const threadId = match.params.id;

  useEffect(() => {
    if (comments) {
      const filteredComments = comments.filter(
        comment => comment.threadId.toString() === threadId.toString(),
      );
      setThreadComments(filteredComments);
    }
  }, [comments]);

  useEffect(() => {
    if (thread) setActiveThread(thread);
  }, [threadId, pageType]);

  return (
    <>
      {activeThread && comments && (
        <ThreadTemplate
          pageType={pageType}
          threadId={threadId}
          comments={threadComments}
          loggedUser={loggedUser}
          activeThread={activeThread}
        />
      )}
    </>
  );
};

ThreadPage.propTypes = {
  thread: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
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
  thread: null,
  comments: [],
};

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { threads } = state.firestore.data;
  const thread = threads ? threads[id] : null;

  return {
    thread,
    comments: state.firestore.ordered.comments,
    loggedUser: state.firebase.profile,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: 'threads' }]),
  firestoreConnect([
    { collection: 'comments', orderBy: ['createdAt', 'desc'] },
  ]),
  firestoreConnect([{ collection: 'users' }]),
)(ThreadPage);
