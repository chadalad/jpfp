import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './rootreducer';
import thunk from 'redux-thunk';

const initialState = {};

const middleware = [thunk];

// const loggingMiddleware = store => next => action => {
//   console.log('Action: ', action);

//   next(action);

//   console.log('New State: ', store.getState());
// };

// const store = createStore(rootReducer, applyMiddleware(loggingMiddleware));

const store = createStore(
  rootReducer, 
  initialState, 
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);

export default store;
