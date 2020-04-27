import styled, { css } from 'styled-components';

const PaginationButton = styled.button`
  width: 30px;
  height: 30px;
  background-color: ${({ theme }) => theme.white};
  color: black;
  box-shadow: 1px 1px 3px -2px ${({ theme }) => theme.black};
  border-radius: ${({ theme }) => theme.borderRadius};
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: ${({ theme }) => theme.light};
  outline: none;
  cursor: pointer;

  :hover {
    box-shadow: 1px 1px 4px -2px ${({ theme }) => theme.black};
  }

  :active {
    box-shadow: -1px -1px 3px -2px ${({ theme }) => theme.black};
  }

  ${({ disabled }) =>
    disabled &&
    css`
      background-color: transparent;
      box-shadow: none;
      border: none;
      cursor: default;

      :hover,
      :active {
        box-shadow: none;
      }
    `}
`;

export default PaginationButton;
