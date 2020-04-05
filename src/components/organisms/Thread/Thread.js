import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import moment from 'moment';
import Paragraph from 'components/atoms/Paragraph/Paragraph';
import Heading from 'components/atoms/Heading/Heading';
import Avatar from 'components/atoms/Avatar/Avatar';
import Box from 'components/atoms/Box/Box';
import NewItemTag from 'components/atoms/NewItemTag/NewItemTag';
import { checkIfNew } from 'utils';

const StyledWrapper = styled(Box)`
  height: ${({ isnew }) => (isnew ? '150px' : '120px')};
  position: relative;
  cursor: pointer;

  :hover {
    box-shadow: 2px 2px 3px -3px black;
  }

  @media (max-width: 900px) {
    height: ${({ isnew }) => (isnew ? '180px' : '150px')};
  }
`;

const StyledFlex = styled.div`
  display: flex;
  align-items: center;

  & > p:not(:first-child) {
    margin-left: 8px;
  }
`;

const StyledParagraph = styled(Paragraph)`
  font-size: ${({ theme }) => theme.fontSize.xs};
  border: 1px solid ${({ theme }) => theme.gray150};
  padding: 0 5px;
  border-radius: 50px;
  text-align: center;
`;

const StyledUsername = styled(Paragraph)`
  color: ${({ theme }) => theme.purple};
`;

const Thread = ({
  pageType,
  id,
  users,
  authorId,
  createdAt,
  tags,
  title,
  company,
  city,
  minSalary,
  maxSalary,
}) => {
  const data = moment(createdAt.toDate()).calendar();
  const isNew = checkIfNew(createdAt);
  const author = users && users[authorId];

  return (
    <>
      {author && (
        <StyledWrapper
          as={Link}
          to={`/${pageType}/${id}`}
          id={id}
          isnew={isNew ? 1 : 0}
        >
          {isNew && <NewItemTag>New</NewItemTag>}
          {pageType === 'jobs' ? (
            <Heading big purple>
              {minSalary} - {maxSalary}$
            </Heading>
          ) : (
            <StyledFlex>
              {tags.map(tag => (
                <Paragraph key={tag}>{tag}</Paragraph>
              ))}
            </StyledFlex>
          )}

          <Heading boldtext>{title}</Heading>

          {pageType === 'jobs' ? (
            <StyledFlex>
              <Paragraph>
                {company}, {city}
              </Paragraph>
              {tags.map(tag => (
                <StyledParagraph key={tag}>{tag}</StyledParagraph>
              ))}
            </StyledFlex>
          ) : (
            <StyledFlex>
              <Avatar size="small" src={author.avatarSrc} />
              <StyledUsername small>{author.username}</StyledUsername>
              <Paragraph light small>
                posted {data}
              </Paragraph>
            </StyledFlex>
          )}
        </StyledWrapper>
      )}
    </>
  );
};

Thread.propTypes = {
  pageType: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  authorId: PropTypes.string.isRequired,
  createdAt: PropTypes.objectOf(PropTypes.number).isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  users: PropTypes.objectOf(PropTypes.object),
  company: PropTypes.string,
  city: PropTypes.string,
  minSalary: PropTypes.string,
  maxSalary: PropTypes.string,
};

Thread.defaultProps = {
  users: null,
  company: null,
  city: null,
  minSalary: null,
  maxSalary: null,
};

const mapStateToProps = state => {
  return {
    users: state.firestore.data.users,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: 'users' }]),
)(Thread);
