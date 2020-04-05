import styled, { css } from 'styled-components';
import searchIcon from 'assets/icons/search.svg';

const Input = styled.input`
  width: 95%;
  height: 25px;
  margin: 0 10px;
  border-radius: ${({ theme }) => theme.borderRadius};
  outline: none;
  border: 1px solid ${({ theme }) => theme.gray100};
  font-size: ${({ theme }) => theme.fontSize.m};
  font-weight: ${({ theme }) => theme.light};
  padding: 0 15px;

  ::placeholder {
    color: ${({ theme }) => theme.gray200};
  }

  ${({ search }) =>
    search &&
    css`
      width: 245px;
      height: 45px;
      background-image: url(${searchIcon});
      background-repeat: no-repeat;
      background-size: 16px;
      background-position: 20px center;
      margin: 0;
      padding: 0 50px;

      @media (max-width: 700px) {
        width: 80%;
      }

      @media (max-width: 450px) {
        width: 75%;
      }
    `}
`;

export default Input;
