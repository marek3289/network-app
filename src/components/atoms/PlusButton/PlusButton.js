import styled, { css } from 'styled-components';

const PlusButton = styled.button`
  width: 28px;
  height: 28px;
  background-color: transparent;
  box-shadow: 1px 1px 2px -2px black;
  outline: none;
  border: 1px solid black;
  border-radius: 50px;
  cursor: pointer;
  position: relative;
  flex-shrink: 0;

  ::before,
  ::after {
    content: '';
    position: absolute;
    width: 16px;
    height: 2px;
    background-color: black;
    top: 12px;
    left: 5px;
  }

  ::before {
    transform: rotate(90deg);
  }

  ${({ exit }) =>
    exit &&
    css`
      width: 16px;
      height: 16px;
      position: absolute;
      top: 10px;
      right: 10px;
      border-radius: 3px;

      ::before,
      ::after {
        width: 10px;
        height: 2px;
        top: 6px;
        left: 2px;
      }

      ::before {
        transform: rotate(45deg);
      }
      ::after {
        transform: rotate(-45deg);
      }
    `}}
`;

export default PlusButton;
