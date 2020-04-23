import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from 'store/reducers/rootReducer';
import thunk from 'redux-thunk';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { getFirebase } from 'react-redux-firebase';
import fbConfig from 'fbConfig';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirestore, getFirebase })),
    reduxFirestore(fbConfig),
  ),
);

export default store;
