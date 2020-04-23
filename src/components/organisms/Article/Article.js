import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeElementAction } from 'store/actions/threadsActions';
import Modal from 'components/organisms/Modal/Modal';
import UserWithText from 'components/molecules/UserWithText/UserWithText';
import Paragraph from 'components/atoms/Paragraph/Paragraph';
import Heading from 'components/atoms/Heading/Heading';
import Box from 'components/atoms/Box/Box';
import Button from 'components/atoms/Button/Button';
import moment from 'moment';

const StyledWrapper = styled(Box)`
  position: relative;

  & > * {
    margin: 10px 0;
  }
`;

const StyledHead = styled.div`
  display: grid;
  grid-gap: 8px;
`;

const StyledParagraph = styled(Paragraph)`
  :first-child {
    margin-left: 0px;
  }
`;

const StyledFlexWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Article = ({ pageType, loggedUser, threadId, activeThread }) => {
  const [redirect, setRedirect] = useState(false);
  const [isModalOpen, setModal] = useState(false);

  const {
    title,
    content,
    tags,
    createdAt,
    company,
    city,
    minSalary,
    maxSalary,
    authorId,
  } = activeThread;

  const users = useSelector(state => state.firestore.data.users);
  const dispatch = useDispatch();
  const removeElement = useCallback(
    (type, id) => dispatch(removeElementAction(type, id)),
    [dispatch],
  );

  const data = moment(createdAt.toDate()).calendar();
  const author = users && users[authorId];

  const handleDelete = () => {
    removeElement('threads', threadId);
    setRedirect(true);
  };

  if (redirect) {
    return <Redirect to={`/${pageType}`} />;
  }

  return (
    <>
      {author && (
        <StyledWrapper as="article">
          {pageType === 'jobs' ? (
            <>
              {author.username === loggedUser.username && (
                <Button secondary onClick={() => setModal(true)}>
                  Delete Thread
                </Button>
              )}
              <StyledHead>
                <Heading purple>
                  {minSalary} - {maxSalary}$ net/month
                </Heading>
                <StyledFlexWrapper>
                  <Heading bld big>
                    {title}
                  </Heading>
                  <Paragraph light small>
                    posted {data}
                  </Paragraph>
                </StyledFlexWrapper>
                <StyledFlexWrapper>
                  <Paragraph>
                    {company}, {city}
                  </Paragraph>
                  {tags.map(tag => (
                    <Paragraph inBorder key={tag}>
                      {tag}
                    </Paragraph>
                  ))}
                </StyledFlexWrapper>
              </StyledHead>
              <Heading>{content}</Heading>
            </>
          ) : (
            <>
              <StyledHead>
                {author.username === loggedUser.username && (
                  <Button secondary onClick={() => setModal(true)}>
                    Delete Thread
                  </Button>
                )}
                <Heading bold="true" big>
                  {title}
                </Heading>
                <StyledFlexWrapper>
                  {tags.map(tag => (
                    <StyledParagraph inBorder key={tag}>
                      {tag}
                    </StyledParagraph>
                  ))}
                </StyledFlexWrapper>
              </StyledHead>
              <UserWithText
                name={author.username}
                src={author.avatarSrc}
                content={content}
                data={data}
              />
            </>
          )}
        </StyledWrapper>
      )}
      {isModalOpen && (
        <Modal popout handleAction={handleDelete} setModal={setModal} />
      )}
    </>
  );
};

Article.propTypes = {
  pageType: PropTypes.string.isRequired,
  threadId: PropTypes.string.isRequired,
  loggedUser: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.bool,
  ]).isRequired,
  activeThread: PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    createdAt: PropTypes.objectOf(PropTypes.number).isRequired,
    company: PropTypes.string,
    city: PropTypes.string,
    minSalary: PropTypes.string,
    maxSalary: PropTypes.string,
    authorId: PropTypes.string.isRequired,
  }),
};

Article.defaultProps = {
  activeThread: PropTypes.shape({
    company: '',
    city: '',
    minSalary: '',
    maxSalary: '',
  }),
};

Article.defaultProps = {
  activeThread: PropTypes.shape({
    company: '',
    city: '',
    minSalary: '',
    maxSalary: '',
  }),
};

export default Article;
