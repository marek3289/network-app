import React from 'react';
import RadioInput from 'components/atoms/RadioInput/RadioInput';

export default {
  title: 'atoms/RadioInput',
  component: RadioInput,
};

export const Radio = () => <RadioInput>Value</RadioInput>;
export const ActiveRadio = () => <RadioInput checked>Value</RadioInput>;
