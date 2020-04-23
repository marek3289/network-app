import React, { useReducer, useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import AuthTemplate from 'templates/AuthTemplate';
import Input from 'components/atoms/Input/Input';
import Button from 'components/atoms/Button/Button';
import Heading from 'components/atoms/Heading/Heading';
import Paragraph from 'components/atoms/Paragraph/Paragraph';
import { PageContext } from 'context';
import { signInAction, signUpAction } from 'store/actions/authActions';

const heading = {
  login: 'Sign in to Network',
  register: 'Sign up to Network',
};

const StyledHeading = styled(Heading)`
  font-size: ${({ theme }) => theme.fontSize.l};
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80%;
`;

const StyledInput = styled(Input)`
  padding: 20px 15px;
  margin: 5px 0;
`;

const StyledButton = styled(Button)`
  margin: 50px 0 20px;

  @media (max-width: 400px) {
    margin-top: 25px;
  }
`;

const AuthPage = ({ location }) => {
  const auth = useSelector(state => state.firebase.auth);
  const authError = useSelector(state => state.auth.authError);

  const dispatch = useDispatch();
  const signIn = useCallback(creds => dispatch(signInAction(creds)), [
    dispatch,
  ]);
  const signUp = useCallback(newUser => dispatch(signUpAction(newUser)), [
    dispatch,
  ]);

  const pageType = useContext(PageContext);
  const { from } = location.state || { from: { pathname: '/' } };

  const initialState = {
    username: '',
    email: '',
    password: '',
  };

  const [inputContent, setInputContent] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    initialState,
  );
  const handleChange = e =>
    setInputContent({ [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    if (pageType === 'register') {
      signUp(inputContent);
    } else {
      signIn(inputContent);
    }
  };

  if (auth.uid) {
    return <Redirect to={from} />;
  }

  return (
    <AuthTemplate pageType={pageType}>
      <StyledHeading bold="true">{heading[pageType]}</StyledHeading>
      <StyledForm onSubmit={handleSubmit}>
        {pageType === 'register' && (
          <StyledInput
            type="text"
            name="username"
            value={inputContent.username}
            onChange={handleChange}
            placeholder="Username"
          />
        )}
        <StyledInput
          type="email"
          name="email"
          value={inputContent.email}
          onChange={handleChange}
          placeholder="E-mail"
        />
        <StyledInput
          type="password"
          name="password"
          value={inputContent.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <StyledButton>
          {pageType === 'register' ? 'Sign Up' : 'Sign In'}
        </StyledButton>
        {authError && <Paragraph>{authError}</Paragraph>}
      </StyledForm>
    </AuthTemplate>
  );
};

AuthPage.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.object,
  }),
};

AuthPage.defaultProps = {
  location: undefined,
};

export default AuthPage;
