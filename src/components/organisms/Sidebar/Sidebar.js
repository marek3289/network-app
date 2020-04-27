import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Modal from 'components/organisms/Modal/Modal';
import Tag from 'components/molecules/Tag/Tag';
import Button from 'components/atoms/Button/Button';
import Paragraph from 'components/atoms/Paragraph/Paragraph';
import { tags } from 'utils';

const StyledWrapper = styled.aside`
  width: 250px;
  flex-shrink: 0;
  padding: 5px;

  @media (max-width: 700px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const StyledListWrapper = styled.div`
  margin-top: 30px;
  align-self: center;
`;

const StyledList = styled.div`
  margin: 10px 0;

  @media (max-width: 700px) {
    display: grid;
    margin: 0;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 5px;
    white-space: nowrap;
  }

  @media (max-width: 400px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Sidebar = ({ activeTag, setActiveTag }) => {
  const [isModalOpen, setModal] = useState(false);
  const filterByTags = e => setActiveTag(e.target.textContent);

  return (
    <StyledWrapper>
      <Button onClick={() => setModal(true)}>Create New Thread</Button>
      <StyledListWrapper>
        <Paragraph>TAGS</Paragraph>
        <StyledList>
          {tags.map(tag => (
            <Tag
              key={tag.name}
              name={tag.name}
              isActive={tag.name.includes(activeTag)}
              filterByTags={filterByTags}
            />
          ))}
        </StyledList>
      </StyledListWrapper>
      {isModalOpen && <Modal setModal={setModal} />}
    </StyledWrapper>
  );
};

Sidebar.propTypes = {
  activeTag: PropTypes.string.isRequired,
  setActiveTag: PropTypes.func,
};

Sidebar.defaultProps = {
  setActiveTag: null,
};

export default Sidebar;
