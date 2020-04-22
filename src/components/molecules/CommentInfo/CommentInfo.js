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
    {!comments.length ? (
      <StyledHeading height={comments}>
        <Heading bold="true">Be the first one to write a comment</Heading>
      </StyledHeading>
    ) : (
      <Heading>{comments.length} comments</Heading>
    )}
  </>
);

CommentInfo.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object),
};

CommentInfo.defaultProps = {
  comments: [],
};

export default CommentInfo;
