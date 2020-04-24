import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import ThreadTemplate from 'templates/ThreadTemplate';
import { PageContext } from 'context';

const ThreadPage = ({ match }) => {
  const pageType = useContext(PageContext);
  const { id } = match.params;

  useFirestoreConnect([{ collection: 'threads', doc: id }]);
  useFirestoreConnect([
    { collection: 'comments', orderBy: ['createdAt', 'desc'] },
  ]);
  const thread = useSelector(
    state => state.firestore.data.threads && state.firestore.data.threads[id],
  );
  const comments = useSelector(state => state.firestore.ordered.comments);

  const [activeThread, setActiveThread] = useState(null);
  const [threadComments, setThreadComments] = useState([]);

  useEffect(() => {
    if (thread) setActiveThread(thread);
  }, [thread, id]);

  useEffect(() => {
    const filteredComments =
      comments &&
      comments.filter(comment => comment.threadId.toString() === id.toString());
    setThreadComments(filteredComments);
  }, [comments, id]);

  return (
    <>
      {activeThread && (
        <ThreadTemplate
          pageType={pageType}
          threadId={id}
          comments={threadComments}
          activeThread={activeThread}
        />
      )}
    </>
  );
};

ThreadPage.propTypes = {
  match: PropTypes.shape({ params: PropTypes.object }).isRequired,
};

export default ThreadPage;
