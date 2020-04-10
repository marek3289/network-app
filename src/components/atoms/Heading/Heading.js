import styled, { css } from 'styled-components';

const Heading = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.m};
  font-weight: ${({ theme, bold }) => (bold ? theme.bold : theme.regular)};
  color: ${({ theme, purple }) => (purple ? theme.purple : 'black')};
  text-decoration: none;

  ${({ big }) =>
    big &&
    css`
      font-size: ${({ theme }) => theme.fontSize.l};
    `}

  ${({ small }) =>
    small &&
    css`
      font-size: ${({ theme }) => theme.fontSize.s};
    `}
`;

export default Heading;
