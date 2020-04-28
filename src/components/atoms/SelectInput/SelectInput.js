import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

const options = [
  { value: 'Animation', label: 'Animation' },
  { value: 'Art Direction', label: 'Art Direction' },
  { value: 'Branding', label: 'Branding' },
  { value: 'Graphic Design', label: 'Graphic Design' },
  { value: 'Iconography', label: 'Iconography' },
  { value: 'Illustration', label: 'Illustration' },
  { value: 'Mobility', label: 'Mobility' },
  { value: 'Marvel', label: 'Marvel' },
  { value: 'Prototyping', label: 'Prototyping' },
  { value: 'Project Management', label: 'Project Management' },
  { value: 'User Research', label: 'User Research' },
  { value: 'UI Design', label: 'UI Design' },
  { value: 'UX Design', label: 'UX Design' },
  { value: 'Video Editing', label: 'Video Editing' },
];

const customStyles = {
  container: provided => ({
    ...provided,
    width: '95%',
    height: 35,
    marginLeft: 10,
    marginBottom: 30,
  }),
  indicatorsContainer: provided => ({ ...provided, height: 35 }),
  placeholder: () => ({ fontSize: 12, color: 'hsl(206, 4%, 64%)' }),
  menuList: () => ({ fontSize: 12, height: 100, overflow: 'auto' }),
  input: () => ({ height: 10, margin: 0, padding: 0 }),
  multiValue: provided => ({
    ...provided,
    padding: 2,
    margin: 2,
    fontSize: 13,
  }),
};

const control = {
  height: 'auto',
  background: 'white',
  display: 'flex',
  alignItems: 'center',
  borderRadius: 5,
};

const customControl = {
  control: () => ({
    ...control,
    border: '1px solid hsl(270, 6%, 94%)',
  }),
};

const customControlError = {
  control: () => ({
    ...control,
    border: '1px solid red',
  }),
};

const SelectInput = ({ selected, handleSelect, error }) => {
  const controlStyle = error ? customControlError : customControl;

  return (
    <Select
      value={selected}
      onChange={handleSelect}
      options={selected !== null && selected.length === 3 ? [] : options}
      isMulti="true"
      styles={{ ...customStyles, ...controlStyle }}
      isSearchable={false}
      placeholder="Select tags (max 3)"
      noOptionsMessage={() =>
        selected.length === 3
          ? "You've reached the max options value"
          : 'No options available'
      }
    />
  );
};

SelectInput.propTypes = {
  selected: PropTypes.arrayOf(PropTypes.object),
  handleSelect: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired,
};

SelectInput.defaultProps = {
  selected: null,
};

export default SelectInput;
