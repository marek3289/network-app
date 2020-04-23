import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import UserWithText from 'components/molecules/UserWithText/UserWithText';
import Box from 'components/atoms/Box/Box';
import Button from 'components/atoms/Button/Button';
import { removeElementAction } from 'store/actions/threadsActions';
import moment from 'moment';

const StyledWrapper = styled(Box)`
  min-height: auto;
  position: relative;
`;

const Comment = ({ id, authorId, createdAt, content, loggedUser }) => {
  const dispatch = useDispatch();
  useFirestoreConnect('users');
  const users = useSelector(state => state.firestore.data.users);
  const removeElement = useCallback(
    (type, itemId) => dispatch(removeElementAction(type, itemId)),
    [dispatch],
  );

  const handleDelete = () => removeElement('comments', id);

  const author = users && users[authorId];
  const data = moment(createdAt.toDate()).calendar();

  return (
    <>
      {author && (
        <StyledWrapper>
          {author.username === loggedUser.username && (
            <Button secondary onClick={handleDelete}>
              delete
            </Button>
          )}
          <UserWithText
            name={author.username}
            src={author.avatarSrc}
            content={content}
            data={data}
          />
        </StyledWrapper>
      )}
    </>
  );
};

Comment.propTypes = {
  id: PropTypes.string.isRequired,
  authorId: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.objectOf(PropTypes.number).isRequired,
  loggedUser: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.bool,
  ]).isRequired,
};

export default Comment;
