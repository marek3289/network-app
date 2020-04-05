import React from 'react';
import SelectInput from 'components/atoms/SelectInput/SelectInput';

export default {
  title: 'atoms/SelectInput',
  component: SelectInput,
};

export const Input = () => <SelectInput />;

export const OneSelected = () => (
  <SelectInput
    selected={{
      value: 'Art Direction',
      label: 'Art Direction',
    }}
  />
);

export const TwoSelected = () => (
  <SelectInput
    selected={[
      { value: 'Art Direction', label: 'Art Direction' },
      { value: 'UI Design', label: 'UI Design' },
    ]}
  />
);

export const ThreeSelected = () => (
  <SelectInput
    selected={[
      { value: 'Art Direction', label: 'Art Direction' },
      { value: 'UI Design', label: 'UI Design' },
      { value: 'UX Design', label: 'UX Design' },
    ]}
  />
);
