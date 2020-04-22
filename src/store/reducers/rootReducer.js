import authReducer from 'store/reducers/authReducer';
import threadsReducer from 'store/reducers/threadsReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

const rootReducer = combineReducers({
  auth: authReducer,
  threads: threadsReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});

export default rootReducer;
