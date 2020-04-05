import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import UserWithText from 'components/molecules/UserWithText/UserWithText';
import Box from 'components/atoms/Box/Box';
import Button from 'components/atoms/Button/Button';
import { removeElementAction } from 'actions';
import moment from 'moment';

const StyledWrapper = styled(Box)`
  min-height: auto;
  position: relative;
`;

const Comment = ({
  id,
  users,
  authorId,
  loggedUser,
  removeElement,
  content,
  createdAt,
}) => {
  const handleDelete = () => removeElement('comments', id);
  const data = moment(createdAt.toDate()).calendar();
  const author = users && users[authorId];

  return (
    <>
      {author && (
        <StyledWrapper>
          {author.username === loggedUser.username && (
            <Button secondary onClick={handleDelete}>
              delete comment
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
  users: PropTypes.objectOf(PropTypes.object).isRequired,
  authorId: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.objectOf(PropTypes.number).isRequired,
  removeElement: PropTypes.func.isRequired,
  loggedUser: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.bool,
  ]).isRequired,
};
const mapStateToProps = state => ({ users: state.firestore.data.users });
const mapDispatchToProps = dispatch => ({
  removeElement: (type, id) => dispatch(removeElementAction(type, id)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: 'users' }]),
)(Comment);
