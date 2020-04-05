import React from 'react';
import Button from 'components/atoms/Button/Button';
import { action } from '@storybook/addon-actions';

export default {
  title: 'atoms/Button',
  component: Button,
};

export const PrimaryButton = () => (
  <Button onClick={action('clicked')}>Create New Thread</Button>
);
export const SmallPrimaryButton = () => (
  <Button small onClick={action('clicked')}>
    Create New Thread
  </Button>
);
export const SecondaryButton = () => (
  <Button secondary onClick={action('clicked')}>
    Delete Post
  </Button>
);
