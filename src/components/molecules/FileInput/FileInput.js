import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Avatar from 'components/atoms/Avatar/Avatar';

const StyledWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FileInput = ({ src, handleAction }) => (
  <StyledWrapper>
    <Avatar size="big" src={src} />
    <input type="file" name="file" onChange={handleAction} />
  </StyledWrapper>
);

FileInput.propTypes = {
  src: PropTypes.string.isRequired,
  handleAction: PropTypes.func.isRequired,
};

export default FileInput;
