import { 
  FETCH_MUSEUMS, 
  NEW_MUSEUM, 
  DELETE_MUSEUM, 
  EDIT_MUSEUM,
  SET_MUSEUM_TO_SELECTED, 
} from './museums.types';

const initialState = {
  museums: [],  //  All Museums
  museum: {},   //  Single Museum
};

export const museumReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MUSEUMS:
      return {
        ...state,
        museums: action.museums,
      };
    case NEW_MUSEUM:
      return {
        ...state,
        museums: state.museums.concat(action.museum),
      }
    case SET_MUSEUM_TO_SELECTED:
      return {
        ...state,
        museum: action.currentMuseum,
      };
    case EDIT_MUSEUM:
      return {
        ...state,

      }
    case DELETE_MUSEUM:
      return {
        ...state,
        museums: state.museums.filter(museum => museum.id !== action.id),
      };
    default:
      return state;
  }
}
