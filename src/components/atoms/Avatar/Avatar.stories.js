import React from 'react';
import Avatar from 'components/atoms/Avatar/Avatar';

export default {
  title: 'atoms/Avatar',
  component: Avatar,
};

export const DefaultAvatar = () => <Avatar />;
export const BigDefaultAvatar = () => <Avatar size="big" />;
export const SmallDefaultAvatar = () => <Avatar size="small" />;

export const UserAvatar = () => <Avatar src="https://picsum.photos/100/100" />;
export const BigUserAvatar = () => (
  <Avatar size="big" src="https://picsum.photos/100/100" />
);
export const SmallUserAvatar = () => (
  <Avatar size="small" src="https://picsum.photos/100/100" />
);
