import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Heading from 'components/atoms/Heading/Heading';

const StyledWrapper = styled.div`
  padding: 10px 15px;
  border-radius: ${({ theme }) => theme.borderRadius};
  margin: 2px;
  background-color: ${({ active }) => (active ? 'white' : 'transparent')};
  box-shadow: ${({ active }) => active && '1px 1px 2px -2px black'};
  cursor: pointer;
  user-select: none;

  @media (max-width: 700px) {
    padding: 5px;
    text-align: center;
  }
`;

const Tag = ({ name, isActive, filterByTags }) => (
  <StyledWrapper active={isActive} onClick={filterByTags}>
    <Heading bold={isActive}>{name}</Heading>
  </StyledWrapper>
);

Tag.propTypes = {
  name: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  filterByTags: PropTypes.func.isRequired,
};

export default Tag;
