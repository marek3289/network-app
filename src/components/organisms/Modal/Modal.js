import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import NewThreadForm from 'components/molecules/NewThreadForm/NewThreadForm';
import ProfileForm from 'components/molecules/ProfileForm/ProfileForm';
import Heading from 'components/atoms/Heading/Heading';
import Button from 'components/atoms/Button/Button';
import PlusButton from 'components/atoms/PlusButton/PlusButton';

const popouts = {
  logout: 'sign out?',
  delete: 'delete this thread?',
};

const StyledOverlay = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: hsla(0, 0%, 0%, 30%);
  z-index: 10;
`;

const StyledModal = styled.div`
  position: absolute;
  background-color: white;
  border-radius: ${({ theme }) => theme.borderRadius};
  overflow: hidden;
  box-shadow: 1px 1px 12px -8px black;
  width: 400px;
  height: 80%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px 20px;

  @media (max-width: 450px) {
    width: 90%;
  }

  ${({ popout }) =>
    popout &&
    css`
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;
      top: 30%;
      height: 150px;
    `}
`;

const StyledButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
`;

const Modal = ({ setModal, popout, action, handleAction, userProfileInfo }) => {
  const handleClose = e => {
    if (e.target !== e.currentTarget) return;
    setModal(false);
  };

  return (
    <StyledOverlay onClick={handleClose}>
      <StyledModal popout={popout}>
        {popout ? (
          <>
            <Heading bold>Are you sure you want to {popouts[action]}</Heading>
            <StyledButtonWrapper>
              <Button small onClick={handleAction}>
                Yes
              </Button>
              <Button small onClick={() => setModal(false)}>
                No
              </Button>
            </StyledButtonWrapper>
          </>
        ) : (
          <>
            <PlusButton exit onClick={() => setModal(false)} />
            {userProfileInfo ? (
              <ProfileForm
                userProfileInfo={userProfileInfo}
                setModal={setModal}
              />
            ) : (
              <NewThreadForm setModal={setModal} />
            )}
          </>
        )}
      </StyledModal>
    </StyledOverlay>
  );
};

Modal.propTypes = {
  setModal: PropTypes.func.isRequired,
  handleAction: PropTypes.func,
  action: PropTypes.string,
  popout: PropTypes.bool,
  userProfileInfo: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
};

Modal.defaultProps = {
  handleAction: null,
  popout: false,
  action: '',
  userProfileInfo: false,
};

export default Modal;
