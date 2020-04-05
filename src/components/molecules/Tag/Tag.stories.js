import React from 'react';
import Tag from 'components/molecules/Tag/Tag';

export default {
  title: 'molecules/Tag',
  component: Tag,
};

export const NormalTag = () => <Tag name="UX Design" />;
export const ActiveTag = () => <Tag name="UX Design" isActive />;
