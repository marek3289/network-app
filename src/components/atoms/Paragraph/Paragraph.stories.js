import React from 'react';
import Paragraph from 'components/atoms/Paragraph/Paragraph';

export default {
  title: 'atoms/Paragraph',
  component: Paragraph,
};

export const NormalText = () => <Paragraph>Some text</Paragraph>;
export const SmallText = () => <Paragraph small>Some text</Paragraph>;
