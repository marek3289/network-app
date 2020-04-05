import React from 'react';
import PropTypes from 'prop-types';
import ContentTemplate from 'templates/ContentTemplate';
import Article from 'components/organisms/Article/Article';
import Comment from 'components/organisms/Comment/Comment';
import CommentForm from 'components/molecules/CommentForm/CommentForm';
import CommentInfo from 'components/molecules/CommentInfo/CommentInfo';

const ThreadTemplate = ({
  pageType,
  comments,
  threadId,
  loggedUser,
  ...props
}) => {
  const threadComments = comments.filter(
    comment => comment.threadId.toString() === threadId.toString(),
  );

  return (
    <ContentTemplate>
      <Article
        pageType={pageType}
        threadId={threadId}
        loggedUser={loggedUser}
        {...props}
      />
      <CommentForm threadId={threadId} loggedUser={loggedUser} />
      <CommentInfo comments={threadComments} />
      {threadComments &&
        threadComments.map(comment => (
          <Comment
            key={comment.id}
            id={comment.id}
            authorId={comment.authorId}
            createdAt={comment.createdAt}
            content={comment.content}
            loggedUser={loggedUser}
          />
        ))}
    </ContentTemplate>
  );
};

ThreadTemplate.propTypes = {
  pageType: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(PropTypes.object),
  threadId: PropTypes.string.isRequired,
  loggedUser: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.bool]),
  ).isRequired,
};

ThreadTemplate.defaultProps = {
  comments: null,
};

export default ThreadTemplate;
