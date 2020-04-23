import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import ThreadTemplate from 'templates/ThreadTemplate';
import { PageContext } from 'context';

const ThreadPage = ({ match }) => {
  const pageType = useContext(PageContext);
  const threadId = match.params.id;

  useFirestoreConnect([
    { collection: 'threads', where: ['id', '==', threadId] },
  ]);
  useFirestoreConnect([
    { collection: 'comments', orderBy: ['createdAt', 'desc'] },
  ]);

  const comments = useSelector(state => state.firestore.ordered.comments);
  const thread = useSelector(state => {
    const { threads } = state.firestore.data;
    return threads && threads[threadId];
  });

  const [activeThread, setActiveThread] = useState([]);
  const [threadComments, setThreadComments] = useState(null);

  useEffect(() => {
    if (comments) {
      const filteredComments = comments.filter(
        comment => comment.threadId.toString() === threadId.toString(),
      );
      setThreadComments(filteredComments);
    }
  }, [comments, threadId]);

  useEffect(() => {
    if (thread) setActiveThread(thread);
  }, [threadId, thread]);

  return (
    <>
      {activeThread && threadComments && (
        <ThreadTemplate
          pageType={pageType}
          threadId={threadId}
          comments={threadComments}
          activeThread={activeThread}
        />
      )}
    </>
  );
};

ThreadPage.propTypes = {
  match: PropTypes.shape({ params: PropTypes.object }),
};

ThreadPage.defaultProps = {
  match: undefined,
};

export default ThreadPage;
