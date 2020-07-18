import { combineReducers } from 'redux';
import { museumReducer } from './museums/index';
import { artworkReducer } from './artworks/artworks.reducers'

export default combineReducers({
  museums: museumReducer,
  allArt: artworkReducer,
});
