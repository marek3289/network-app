import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import Heading from 'components/atoms/Heading/Heading';

const StyledWrapper = styled.ul`
  display: flex;
  justify-content: center;
  list-style: none;

  @media (max-width: 700px) {
    align-self: flex-end;
  }
`;

const StyledLink = styled(Heading)`
  margin: 0 10px;

  &.active {
    font-weight: ${({ theme }) => theme.bold};
    border-bottom: 2px solid ${({ theme }) => theme.purple};
    padding: 19px 0;

    @media (max-width: 700px) {
      padding: 0;
    }
  }
`;

const Navigation = () => (
  <StyledWrapper>
    <li>
      <StyledLink as={NavLink} to="/forum" activeClassName="active">
        Forum
      </StyledLink>
    </li>
    <li>
      <StyledLink as={NavLink} to="/updates" activeClassName="active">
        Updates
      </StyledLink>
    </li>
    <li>
      <StyledLink as={NavLink} to="/jobs" activeClassName="active">
        Jobs
      </StyledLink>
    </li>
  </StyledWrapper>
);

export default Navigation;
