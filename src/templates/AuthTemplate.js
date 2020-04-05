import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Paragraph from 'components/atoms/Paragraph/Paragraph';

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  place-items: center;
`;

const StyledCard = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 50px;
  width: 350px;
  height: 500px;
  margin: 15px;
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 1px 1px 12px -8px black;

  @media (max-width: 400px) {
    width: 300px;
    height: 400px;
    padding: 25px;
  }
`;

const StyledFlex = styled.div`
  display: flex;
  align-items: center;
`;

const StyledLink = styled(Paragraph)`
  margin: 0 5px;
  font-size: ${({ theme }) => theme.fontSize.m};
`;

const AuthTemplate = ({ children, pageType }) => {
  return (
    <StyledWrapper>
      <StyledCard>{children}</StyledCard>
      <StyledFlex>
        {pageType === 'login' ? (
          <>
            <Paragraph>Do not have an account?</Paragraph>
            <StyledLink as={Link} to="/register">
              Sign Up!
            </StyledLink>
          </>
        ) : (
          <>
            <Paragraph>Already have an account?</Paragraph>
            <StyledLink as={Link} to="/login">
              Sign In!
            </StyledLink>
          </>
        )}
      </StyledFlex>
    </StyledWrapper>
  );
};

AuthTemplate.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
  pageType: PropTypes.string.isRequired,
};

export default AuthTemplate;
