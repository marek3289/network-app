import React from 'react';
import styled from 'styled-components';
import Sidebar from 'components/organisms/Sidebar/Sidebar';

const Background = styled.div`
  background-color: hsl(228, 56%, 98%);
  padding: 10px 20px;
  width: 300px;
`;

export default {
  title: 'organisms/Sidebar',
  component: Sidebar,
  decorators: [storyFn => <Background>{storyFn()}</Background>],
};

export const DefaultSidebar = () => <Sidebar />;
export const ActiveTagSidebar = () => <Sidebar activeTag="All" />;
