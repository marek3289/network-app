import React from 'react';
import styled from 'styled-components';
import Box from 'components/atoms/Box/Box';

const Background = styled.div`
  background-color: hsl(228, 56%, 98%);
  padding: 10px 20px;
`;

export default {
  title: 'atoms/Box',
  component: Box,
  decorators: [storyFn => <Background>{storyFn()}</Background>],
};

export const DefaultBox = () => <Box />;
