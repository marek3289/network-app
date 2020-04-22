import React from 'react';
import PropTypes from 'prop-types';
import ContentTemplate from 'templates/ContentTemplate';
import Article from 'components/organisms/Article/Article';
import Comment from 'components/organisms/Comment/Comment';
import CommentForm from 'components/molecules/CommentForm/CommentForm';
import CommentInfo from 'components/molecules/CommentInfo/CommentInfo';

const ThreadTemplate = ({
  pageType,
  threadId,
  comments,
  loggedUser,
  activeThread,
}) => (
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

ThreadTemplate.propTypes = {
  pageType: PropTypes.string.isRequired,
  threadId: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(PropTypes.object),
  activeThread: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    .isRequired,
  loggedUser: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.bool]),
  ).isRequired,
};

ThreadTemplate.defaultProps = {
  comments: [],
};

export default ThreadTemplate;
