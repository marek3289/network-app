import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Modal from 'components/organisms/Modal/Modal';
import Box from 'components/atoms/Box/Box';
import Avatar from 'components/atoms/Avatar/Avatar';
import Heading from 'components/atoms/Heading/Heading';
import Paragraph from 'components/atoms/Paragraph/Paragraph';
import Button from 'components/atoms/Button/Button';
import moment from 'moment';

const StyledWrapper = styled(Box)`
  width: 250px;
  height: 75vh;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 700px) {
    align-self: center;
    width: 80%;
    height: auto;
  }

  @media (max-width: 400px) {
    width: 90%;
  }
`;

const StyledParagraph = styled(Paragraph)`
  text-align: center;
  margin: 10px;
`;

const StyledJoined = styled.div`
  display: flex;
  margin-top: 30px;
  flex-direction: column;
  align-items: center;
`;

const UserProfileCard = ({ userId, loggedUser }) => {
  const [isModalOpen, setModal] = useState(false);
  const users = useSelector(state => state.firestore.ordered.users);
  const currentUser = users && users.find(user => user.username === userId);

  return (
    <>
      {currentUser && (
        <StyledWrapper as="aside">
          {loggedUser === currentUser.username && (
            <Button secondary onClick={() => setModal(true)}>
              Edit Profile Info
            </Button>
          )}
          <Avatar size="big" src={currentUser.avatarSrc} />
          <Heading bold="true">{currentUser.username}</Heading>
          <Heading small>{currentUser.location}</Heading>
          <StyledParagraph light>{currentUser.bio}</StyledParagraph>
          <StyledJoined>
            <Heading bold="true" small>
              Account Created:
            </Heading>
            <StyledParagraph>
              {moment(currentUser.createdAccount.toDate()).calendar()}
            </StyledParagraph>
          </StyledJoined>
          {isModalOpen && (
            <Modal userProfileInfo={currentUser} setModal={setModal} />
          )}
        </StyledWrapper>
      )}
    </>
  );
};

UserProfileCard.propTypes = {
  userId: PropTypes.string,
  loggedUser: PropTypes.string,
};

UserProfileCard.defaultProps = {
  userId: null,
  loggedUser: null,
};

export default UserProfileCard;
