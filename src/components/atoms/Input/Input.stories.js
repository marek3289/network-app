import React from 'react';
import Input from 'components/atoms/Input/Input';

export default {
  title: 'atoms/Input',
  component: Input,
};

export const NormalButton = () => <Input placeholder="Login" />;
export const SearchButton = () => (
  <Input search placeholder="Search in forum" />
);
