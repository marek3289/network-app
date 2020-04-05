import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Textarea from 'components/atoms/Textarea/Textarea';
import PlusButton from 'components/atoms/PlusButton/PlusButton';
import Avatar from 'components/atoms/Avatar/Avatar';
import Heading from 'components/atoms/Heading/Heading';
import { addCommentAction } from 'actions';

const StyledWrapper = styled.form`
  display: flex;
  align-items: center;
  width: 100%;

  & > * {
    margin: 10px 5px 40px;
  }
`;

const CommentForm = ({ threadId, loggedUser, addComment }) => {
  const [textareaValue, setTextareaValue] = useState('');

  const handleChange = e => setTextareaValue(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();
    addComment(threadId, textareaValue);
    setTextareaValue('');
  };

  return (
    <>
      <Heading>Post Comment</Heading>
      <StyledWrapper onSubmit={handleSubmit}>
        <Avatar src={loggedUser.avatarSrc} />
        <Textarea
          value={textareaValue}
          onChange={handleChange}
          required
          placeholder="Type here to write comment"
        />
        <PlusButton />
      </StyledWrapper>
    </>
  );
};

CommentForm.propTypes = {
  threadId: PropTypes.string.isRequired,
  loggedUser: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.bool]),
  ).isRequired,
  addComment: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  addComment: (itemType, threadId, content) =>
    dispatch(addCommentAction(itemType, threadId, content)),
});

export default connect(null, mapDispatchToProps)(CommentForm);
