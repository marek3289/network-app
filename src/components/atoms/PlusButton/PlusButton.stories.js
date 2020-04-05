import React from 'react';
import PlusButton from 'components/atoms/PlusButton/PlusButton';
import Box from 'components/atoms/Box/Box';
import { action } from '@storybook/addon-actions';

export default {
  title: 'atoms/PlusButton',
  component: PlusButton,
  decorators: [storyFn => <Box>{storyFn()}</Box>],
};

export const Button = () => <PlusButton onClick={action('clicked')} />;
export const ExitButton = () => <PlusButton exit onClick={action('clicked')} />;
