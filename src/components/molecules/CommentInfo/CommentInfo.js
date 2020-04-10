import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Heading from 'components/atoms/Heading/Heading';

const StyledHeading = styled.div`
  display: flex;
  justify-content: center;
`;

const CommentInfo = ({ comments }) => (
  <>
    <Heading>{comments === 0 ? comments : comments.length} comments</Heading>
    <StyledHeading height={comments}>
      {comments.length === 0 && (
        <Heading bold="true">Be the first one to write a comment</Heading>
      )}
    </StyledHeading>
  </>
);

CommentInfo.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object),
};

CommentInfo.defaultProps = {
  comments: 0,
};

export default CommentInfo;
