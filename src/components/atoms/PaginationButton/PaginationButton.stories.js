import React from 'react';
import PaginationButton from 'components/atoms/PaginationButton/PaginationButton';
import { action } from '@storybook/addon-actions';

export default {
  title: 'atoms/PaginationButton',
  component: PaginationButton,
};

export const Button = () => (
  <PaginationButton onClick={action('clicked')}>3</PaginationButton>
);

export const ActiveButton = () => (
  <PaginationButton active onClick={action('clicked')}>
    3
  </PaginationButton>
);
