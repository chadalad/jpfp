import { combineReducers } from 'redux';
import { museumReducer } from './museums/index';
import { artworkReducer } from './artworks/artworks.reducers'

// const rootReducer = museumReducer;

// export default rootReducer;

export default combineReducers({
  // museumLevelData: museumReducer,
  museums: museumReducer,
  allArt: artworkReducer,
});


/**
 * Error: 
 *  State changes from 
 *    state -museums -museums  
 * 
 * Context:
 * State Model
 *    -museum level data:
 *        -museums, museum
 *    -artwork level data:
 *        -artwork, year, etc.
 * 
 * 
 */