import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import UserIcon from 'assets/icons/user.svg';

const StyledImage = styled.img`
  width: 35px;
  height: 35px;
  background-color: ${({ theme }) => theme.gray100};
  border-radius: 50px;
  padding: ${({ src }) => src === UserIcon && '5px'};
  flex-shrink: 0;

  ${({ size }) =>
    size === 'small' &&
    css`
      width: 25px;
      height: 25px;
    `}

  ${({ size }) =>
    size === 'big' &&
    css`
      width: 125px;
      height: 125px;
      border-radius: 60px;
      margin: 25px 0;
      box-shadow: 0px 0px 0px 3px ${({ theme }) => theme.purple};
    `}
`;

const Avatar = ({ size, src }) => <StyledImage size={size} src={src} />;

Avatar.propTypes = {
  src: PropTypes.string,
  size: PropTypes.string,
};

Avatar.defaultProps = {
  src: UserIcon,
  size: null,
};

export default Avatar;
