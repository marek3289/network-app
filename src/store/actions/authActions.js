export const signInAction = creds => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signInWithEmailAndPassword(creds.email, creds.password)
      .then(() => dispatch({ type: 'LOGIN_SUCCESS' }))
      .catch(err => dispatch({ type: 'LOGIN_ERROR', err }));
  };
};

export const signOutAction = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signOut()
      .then(() => dispatch({ type: 'SIGNOUT_SUCCESS' }));
  };
};

export const signUpAction = newUser => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then(res => {
        return firestore
          .collection('users')
          .doc(res.user.uid)
          .set({
            username: newUser.username,
            createdAccount: new Date(),
          });
      })
      .then(() => {
        dispatch({ type: 'SIGNUP_SUCCESS' });
      })
      .catch(err => {
        dispatch({ type: 'SIGNUP_ERROR', err });
      });
  };
};

export const updateProfileAction = userInfo => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const { uid } = getState().firebase.auth;

    firestore
      .collection('users')
      .doc(uid)
      .update({
        avatarSrc: userInfo.avatar,
        location: userInfo.location,
        bio: userInfo.bio,
      })
      .then(() => dispatch({ type: 'UPDATE_PROFILE' }))
      .catch(err => dispatch({ type: 'UPDATE_PROFILE_ERROR', err }));
  };
};
