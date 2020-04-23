export const removeElementAction = (type, id) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    if (type === 'threads') {
      const comments = getState().firestore.ordered.comments.filter(
        comment => comment.threadId === id,
      );

      if (comments.length > 0) {
        comments.forEach(comment =>
          firestore
            .collection('comments')
            .doc(comment.id)
            .delete(),
        );
      }
    }

    firestore
      .collection(type)
      .doc(id)
      .delete()
      .then(() => dispatch({ type: 'REMOVE_ELEMENT' }))
      .catch(err => dispatch({ type: 'REMOVE_ELEMENT_ERROR', err }));
  };
};

export const addThreadAction = (itemType, content) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const { username } = getState().firebase.profile;
    const { uid } = getState().firebase.auth;

    firestore
      .collection('threads')
      .add({
        author: username,
        authorId: uid,
        createdAt: new Date(),
        itemType,
        ...content,
      })
      .then(() => dispatch({ type: 'ADD_THREAD', content }))
      .catch(err => dispatch({ type: 'ADD_THREAD_ERROR', err }));
  };
};

export const addCommentAction = (threadId, content) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const { username } = getState().firebase.profile;
    const { uid } = getState().firebase.auth;

    firestore
      .collection('comments')
      .add({
        author: username,
        authorId: uid,
        createdAt: new Date(),
        threadId,
        content,
      })

      .then(() => dispatch({ type: 'ADD_COMMENT', content }))
      .catch(err => dispatch({ type: 'ADD_COMMENT_ERROR', err }));
  };
};
