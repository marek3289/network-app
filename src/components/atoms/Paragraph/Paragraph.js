import styled, { css } from 'styled-components';

const Paragraph = styled.p`
  font-size: ${({ theme, small }) =>
    small ? theme.fontSize.xs : theme.fontSize.s};
  font-weight: ${({ theme }) => theme.bold};
  color: ${({ theme }) => theme.gray200};

  ${({ light }) =>
    light &&
    css`
      color: ${({ theme }) => theme.gray150};
      margin-left: 7px;
    `}

  ${({ inBorder }) =>
    inBorder &&
    css`
      font-size: ${({ theme }) => theme.fontSize.xs};
      border: 1px solid ${({ theme }) => theme.gray150};
      border-radius: 50px;
      text-align: center;
      padding: 0 5px;
      margin: 0 5px;
    `}
`;

export default Paragraph;
