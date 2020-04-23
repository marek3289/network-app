import React, { useState, useReducer, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import FileInput from 'components/molecules/FileInput/FileInput';
import Heading from 'components/atoms/Heading/Heading';
import Button from 'components/atoms/Button/Button';
import Input from 'components/atoms/Input/Input';
import Textarea from 'components/atoms/Textarea/Textarea';
import { updateProfileAction } from 'store/actions/authActions';
import firebase from 'fbConfig';

const StyledForm = styled.form`
  height: 100%;
  position: relative;
`;

const StyledHeading = styled(Heading)`
  width: 100%;
  text-align: center;
  margin: 0 0 5px;
`;

const StyledFormWrapper = styled.div`
  padding: 15px 0;
  display: grid;
  grid-gap: 10px;

  & > input,
  textarea {
    color: ${({ theme, isEdited }) => (isEdited ? 'black' : theme.gray200)};
  }
`;

const StyledButton = styled(Button)`
  position: absolute;
  bottom: 25px;
  left: 50%;
  transform: translateX(-50%);
`;

const ProfileForm = ({ setModal, userProfileInfo }) => {
  const dispatch = useDispatch();
  const updateProfile = useCallback(
    (userId, UserInfo) => dispatch(updateProfileAction(userId, UserInfo)),
    [dispatch],
  );

  const [isEdited, setIsEdited] = useState(false);
  const initialState = {
    avatar: userProfileInfo.avatarSrc,
    location: userProfileInfo.location,
    bio: userProfileInfo.bio,
  };

  const [inputContent, setInputContent] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    initialState,
  );
  const handleInputChange = e => {
    if (!isEdited) setIsEdited(true);
    setInputContent({ [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    updateProfile(inputContent);
    setModal(false);
  };

  const handleFileChange = e => {
    const storage = firebase.storage();

    const file = e.target.files[0];
    const newAvatar = storage.ref().child(`avatars/${file.name}`);
    newAvatar.put(file).then(snapshot => {
      storage
        .ref()
        .child(snapshot.metadata.fullPath)
        .getDownloadURL()
        .then(img => {
          setInputContent({ avatar: img });
        });
    });
  };

  return (
    <>
      <StyledHeading bold="true">Edit Profile Info</StyledHeading>
      <StyledForm autoComplete="off" onSubmit={e => handleSubmit(e)}>
        <FileInput src={inputContent.avatar} handleAction={handleFileChange} />
        <StyledFormWrapper isEdited={isEdited}>
          <Input
            value={inputContent.location}
            onChange={handleInputChange}
            name="location"
            placeholder="Where are you from?"
          />
          <Textarea
            modal
            value={inputContent.bio}
            onChange={handleInputChange}
            name="bio"
            label="bio"
            placeholder="Tell something about you"
          />
        </StyledFormWrapper>
        <StyledButton small>confirm</StyledButton>
      </StyledForm>
    </>
  );
};

ProfileForm.propTypes = {
  setModal: PropTypes.func.isRequired,
  userProfileInfo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    avatarSrc: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    createdAccount: PropTypes.object.isRequired,
  }).isRequired,
};

export default ProfileForm;
