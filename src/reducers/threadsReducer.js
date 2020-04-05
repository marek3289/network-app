const initialState = {
  forum: [],
  updates: [],
  jobs: [],
};

const threadsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_THREAD':
      return state;
    case 'ADD_THREAD_ERROR':
      return state;
    case 'REMOVE_ELEMENT':
      return state;
    case 'REMOVE_ELEMENT_ERROR':
      return state;
    default:
      return state;
  }
};

export default threadsReducer;
