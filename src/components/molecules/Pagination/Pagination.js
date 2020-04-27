import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PaginationButton from 'components/atoms//PaginationButton/PaginationButton';

const StyledWrapper = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  list-style-type: none;
  width: 100%;

  & > li {
    margin: 0 5px;
  }
`;

const Pagination = ({ postPerPage, totalThreads, currentPage, pageType }) => {
  const pageNumbers = Array(Math.ceil(totalThreads / postPerPage))
    .fill()
    .map((_, i) => i + 1);

  return (
    <StyledWrapper>
      {pageNumbers.length > 1 &&
        pageNumbers.map(num => {
          if (num === 1)
            return (
              <li key={num}>
                <Link to={`/${pageType}`}>
                  <PaginationButton disabled={currentPage === num}>
                    {num}
                  </PaginationButton>
                </Link>
              </li>
            );
          return (
            <li key={num}>
              <Link to={`/${pageType}/page/${num}`}>
                <PaginationButton disabled={num.toString() === currentPage}>
                  {num}
                </PaginationButton>
              </Link>
            </li>
          );
        })}
    </StyledWrapper>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  postPerPage: PropTypes.number.isRequired,
  pageType: PropTypes.string.isRequired,
  totalThreads: PropTypes.number,
};

Pagination.defaultProps = {
  totalThreads: 0,
};

export default Pagination;
