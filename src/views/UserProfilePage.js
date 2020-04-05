import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import ContentTemplate from 'templates/ContentTemplate';

const UserProfilePage = ({ match, loggedUser, threads }) => {
  const { id } = match.params;
  const userThreads = threads && threads.filter(thread => thread.author === id);
  // const threadsAmount = userThreads.length;

  return (
    <ContentTemplate
      userId={id}
      userThreads={userThreads}
      loggedUser={loggedUser}
    />
  );
};

UserProfilePage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),
  loggedUser: PropTypes.string,
  threads: PropTypes.arrayOf(PropTypes.object),
};

UserProfilePage.defaultProps = {
  match: undefined,
  loggedUser: undefined,
  threads: undefined,
};

const mapStateToProps = state => {
  return {
    loggedUser: state.firebase.profile.username,
    threads: state.firestore.ordered.threads,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: 'threads' }]),
)(UserProfilePage);
