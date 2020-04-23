import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import ContentTemplate from 'templates/ContentTemplate';
import Article from 'components/organisms/Article/Article';
import Comment from 'components/organisms/Comment/Comment';
import CommentForm from 'components/molecules/CommentForm/CommentForm';
import CommentInfo from 'components/molecules/CommentInfo/CommentInfo';

const ThreadTemplate = ({ pageType, threadId, comments, activeThread }) => {
  const loggedUser = useSelector(state => state.firebase.profile);

  return (
    <ContentTemplate>
      <Article
        pageType={pageType}
        threadId={threadId}
        loggedUser={loggedUser}
        activeThread={activeThread}
      />
      <CommentForm threadId={threadId} loggedUser={loggedUser} />
      <CommentInfo comments={comments} />
      {comments.map(({ id, authorId, createdAt, content }) => (
        <Comment
          key={id}
          id={id}
          authorId={authorId}
          createdAt={createdAt}
          content={content}
          loggedUser={loggedUser}
        />
      ))}
    </ContentTemplate>
  );
};

ThreadTemplate.propTypes = {
  pageType: PropTypes.string.isRequired,
  threadId: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(PropTypes.object),
  activeThread: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    .isRequired,
};

ThreadTemplate.defaultProps = {
  comments: [],
};

export default ThreadTemplate;
