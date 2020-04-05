import React from 'react';
import ReactDOM from 'react-dom';
import Root from 'views/Root';
import store from 'store';

store.firebaseAuthIsReady.then(() => {
  ReactDOM.render(<Root />, document.getElementById('root'));
});
