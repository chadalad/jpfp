import { 
  FETCH_ALL_ARTWORK, 
  ADD_SINGLE_ARTWORK, 
  DELETE_SINGLE_ARTWORK,
  FETCH_AVAILABLE_ARTWORK,
  FETCH_ART_IN_CURRENT_MUSEUM,
  UPDATE_MUSEUM_ID_STATUS_OF_ARTWORK,
} from './artworks.types';

const initialState = {
  allArtwork: [],
  singleArtwork: {},
  availableArtwork: [],
  currentDisplay: [],
};

export const artworkReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_ALL_ARTWORK:
      return {
        ...state,
        allArtwork: action.fetchedArt,
      };
    case ADD_SINGLE_ARTWORK:
      return {
        ...state,
        allArtwork: state.allArtwork.concat(action.postedArt),
      };
    case DELETE_SINGLE_ARTWORK:
      return {
        ...state,
        allArtwork: state.allArtwork.filter(art => art.id !== action.id)
      };
    case FETCH_AVAILABLE_ARTWORK:
      return {
        ...state,
        availableArtwork: action.available,
      };
    case FETCH_ART_IN_CURRENT_MUSEUM:
      console.log(action.displayed);
      return {
        ...state,
        currentDisplay: action.displayed,
      };
    case UPDATE_MUSEUM_ID_STATUS_OF_ARTWORK:
      console.log('reducer updated: ', action.updatedArt)
      return {
        ...state,
        allArtwork: state.allArtwork.map(art => art.id === action.id ? action.updatedArt : art),
        availableArtwork: state.availableArtwork.filter(art => art.id !== action.id),
        currentDisplay: state.currentDisplay.concat(action.updatedArt),
      };
    default:
      return state;
  }
}