import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const StyledLabel = styled.label`
  position: relative;
  display: inline-flex;
  align-items: center;
  margin: 0 5px;
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: ${({ theme }) => theme.bold};
  color: black;

  & > input {
    position: absolute;
    opacity: 0;
  }
`;

const StyledRadioButton = styled.div`
  margin-right: 5px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.purple};
  flex-shrink: 0;

  ${({ checked }) =>
    checked &&
    css`
      background-color: ${({ theme }) => theme.purple};
      box-shadow: inset 0 0 0 2px white;
    `}
`;

const RadioInput = ({ id, name, checked, changeFunc, children }) => (
  <StyledLabel>
    <input
      id={id}
      name={name}
      type="radio"
      checked={checked}
      onChange={changeFunc}
    />
    <StyledRadioButton checked={checked} />
    {children}
  </StyledLabel>
);

RadioInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  changeFunc: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
};

export default RadioInput;
