import React, { useState, useCallback, useReducer } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Heading from 'components/atoms/Heading/Heading';
import Button from 'components/atoms/Button/Button';
import RadioInput from 'components/atoms/RadioInput/RadioInput';
import SelectInput from 'components/atoms/SelectInput/SelectInput';
import Input from 'components/atoms/Input/Input';
import Textarea from 'components/atoms/Textarea/Textarea';
import { useDispatch } from 'react-redux';
import { addThreadAction } from 'store/actions/threadsActions';
import { autoExpand } from 'utils';

const types = {
  forum: 'forum',
  update: 'updates',
  job: 'jobs',
};

const StyledForm = styled.form`
  height: 100%;
  position: relative;
`;

const StyledRadioWrapper = styled.div`
  display: inline-flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

const StyledHeading = styled(Heading)`
  width: 100%;
  text-align: center;
  margin: 0 0 5px;
`;

const StyledFormWrapper = styled.div`
  padding: 15px 0;
  display: grid;
  grid-gap: 10px;
`;

const StyledFlex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledButton = styled(Button)`
  position: absolute;
  bottom: 25px;
  left: 50%;
  transform: translateX(-50%);
`;

const NewThreadForm = ({ setModal }) => {
  const dispatch = useDispatch();
  const addThread = useCallback(
    (itemType, content) => dispatch(addThreadAction(itemType, content)),
    [dispatch],
  );

  const [pageType, setPageType] = useState(types.forum);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectInputError, setSelectInputError] = useState(false);

  const initialState = {
    tags: [],
    title: '',
    content: '',
    company: '',
    city: '',
    minSalary: '',
    maxSalary: '',
  };

  const [inputContent, setInputContent] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    initialState,
  );

  const handleInputChange = (e, type) => {
    if (type) {
      setInputContent(initialState);
      setPageType(type);
    } else if (e.target.name === 'content') {
      setInputContent({ [e.target.name]: e.target.value });
      autoExpand(e);
    } else {
      setInputContent({ [e.target.name]: e.target.value });
    }
  };

  const handleSelectChange = selectedOption => {
    setSelectedTags(selectedOption);
    setSelectInputError(false);
    if (!selectedOption) return;
    setInputContent({ tags: selectedOption.map(tag => tag.value) });
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!inputContent.tags.length) {
      setSelectInputError(true);
    } else {
      addThread(pageType, inputContent);
      setModal(false);
    }
  };

  return (
    <>
      <StyledHeading bold="true">Create new thread</StyledHeading>
      <StyledForm autoComplete="off" onSubmit={e => handleSubmit(e)}>
        <StyledRadioWrapper>
          <RadioInput
            id={types.forum}
            name="type"
            checked={pageType === types.forum}
            changeFunc={e => handleInputChange(e, types.forum)}
          >
            Thread
          </RadioInput>
          <RadioInput
            id={types.update}
            name="type"
            checked={pageType === types.update}
            changeFunc={e => handleInputChange(e, types.update)}
          >
            Update
          </RadioInput>
          <RadioInput
            id={types.job}
            name="type"
            checked={pageType === types.job}
            changeFunc={e => handleInputChange(e, types.job)}
          >
            Job Offer
          </RadioInput>
        </StyledRadioWrapper>

        <StyledFormWrapper>
          <Input
            value={inputContent.title}
            onChange={handleInputChange}
            name="title"
            placeholder="Title"
            required
          />

          {pageType === types.job && (
            <>
              <StyledFlex>
                <Input
                  value={inputContent.company}
                  onChange={handleInputChange}
                  name="company"
                  placeholder="Company Name"
                  required
                />
                <Input
                  value={inputContent.city}
                  onChange={handleInputChange}
                  name="city"
                  placeholder="City"
                  required
                />
              </StyledFlex>
              <StyledFlex>
                <Input
                  type="number"
                  value={inputContent.minSalary}
                  onChange={handleInputChange}
                  name="minSalary"
                  placeholder="Min Salary"
                  required
                />
                -
                <Input
                  type="number"
                  value={inputContent.maxSalary}
                  onChange={handleInputChange}
                  name="maxSalary"
                  placeholder="Max Salary"
                  required
                />
              </StyledFlex>
            </>
          )}
          <Textarea
            modal
            value={inputContent.content}
            onChange={handleInputChange}
            name="content"
            label="content"
            placeholder="Content"
            required
          />
          <SelectInput
            name="selected"
            selected={selectedTags}
            handleSelect={handleSelectChange}
            error={selectInputError}
          />
        </StyledFormWrapper>
        <StyledButton small>add new item</StyledButton>
      </StyledForm>
    </>
  );
};

NewThreadForm.propTypes = {
  setModal: PropTypes.func.isRequired,
};

export default NewThreadForm;
