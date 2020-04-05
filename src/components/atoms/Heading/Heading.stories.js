import React from 'react';
import Heading from 'components/atoms/Heading/Heading';

export default {
  title: 'atoms/Heading',
  component: Heading,
};
// dla purple dodac knobs ?
export const PurpleText = () => <Heading purple>Some text</Heading>;

export const LightText = () => <Heading>Some text</Heading>;
export const LightBoldText = () => <Heading bold>Some text</Heading>;
export const SmallText = () => <Heading small>Some text</Heading>;
export const BigText = () => <Heading big>Some text</Heading>;
export const SmallBoldText = () => (
  <Heading bold small>
    Some text
  </Heading>
);
export const BigBoldText = () => (
  <Heading bold big>
    Some text
  </Heading>
);
