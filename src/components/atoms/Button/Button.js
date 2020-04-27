import styled, { css } from 'styled-components';

const Button = styled.button`
  width: ${({ small }) => (small ? '120px' : '240px')};
  height: ${({ small }) => (small ? '35px' : '45px')};
  background-color: ${({ theme }) => theme.purple};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 2px 2px 8px -1px ${({ theme }) => theme.purple};
  outline: none;
  font-size: ${({ theme, small }) =>
    small ? theme.fontSize.s : theme.fontSize.m};
  font-weight: ${({ theme }) => theme.light};
  cursor: pointer;

  :hover {
    box-shadow: 3px 3px 10px -1px ${({ theme }) => theme.purple};
  }

  :active {
    box-shadow: -1px -1px 12px -1px ${({ theme }) => theme.purple};
  }

  ${({ secondary }) =>
    secondary &&
    css`
      position: absolute;
      top: 5px;
      right: 15px;
      width: 100px;
      height: 20px;
      font-size: ${({ theme }) => theme.fontSize.xs};
      box-shadow: 1px 1px 3px ${({ theme }) => theme.purple};

      :hover {
        box-shadow: 1px 1px 5px ${({ theme }) => theme.purple};
      }
      :active {
        box-shadow: -1px -1px 3px ${({ theme }) => theme.purple};
      }
    `}

  ${({ pagination }) =>
    pagination &&
    css`
      width: 30px;
      height: 30px;
      background-color: ${({ theme }) => theme.white};
      color: black;
      box-shadow: 1px 1px 3px -2px ${({ theme }) => theme.black};

      :hover {
        box-shadow: 1px 1px 4px -2px ${({ theme }) => theme.black};
      }
      :active {
        box-shadow: -1px -1px 3px -2px ${({ theme }) => theme.black};
      }
    `}
`;

export default Button;
