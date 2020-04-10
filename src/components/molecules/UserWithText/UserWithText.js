import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Paragraph from 'components/atoms/Paragraph/Paragraph';
import Heading from 'components/atoms/Heading/Heading';
import Avatar from 'components/atoms/Avatar/Avatar';

const StyledFlexWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StyledAvatarWrapper = styled(Link)`
  margin: 5px 15px 0 0;
  align-self: flex-start;
`;

const UserWithText = ({ name, src, content, data }) => (
  <StyledFlexWrapper>
    <StyledAvatarWrapper to={`/user/${name}`}>
      <Avatar src={src} />
    </StyledAvatarWrapper>
    <div>
      <StyledFlexWrapper>
        <Heading bold="true" as={Link} to={`/user/${name}`}>
          {name}
        </Heading>
        <Paragraph light small>
          posted {data}
        </Paragraph>
      </StyledFlexWrapper>
      <Heading>{content}</Heading>
    </div>
  </StyledFlexWrapper>
);

UserWithText.propTypes = {
  name: PropTypes.string.isRequired,
  src: PropTypes.string,
  content: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
};

UserWithText.defaultProps = {
  src: undefined,
};

export default UserWithText;
