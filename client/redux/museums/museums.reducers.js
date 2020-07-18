import { 
  UPDATE_FORM, 
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
      console.log('reducer fetch: ', action.museums)
      return {
        ...state,
        museums: action.museums,
      };
    case NEW_MUSEUM:
      console.log('reducer: ', action.museum);
      console.log('state prior to reducer add action: ', state)
      // return {
      //   ...state,
      //   museums: museums.museums.concat(action.museum.museum)
      //   // museum: action.museum,
      // }
      // return Object.assign({}, state, {
      //   museums: [
      //     ...state.museums.museums,
      //     action.museum.museum,
      //   ]
      // })
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
      console.log('reducer (edit): ', action.museum);
      return {
        ...state,

      }
    case DELETE_MUSEUM:
      console.log('reducer (delete): ', action.id)
      return {
        ...state,
        museums: state.museums.filter(museum => museum.id !== action.id),
      };
    default:
      return state;
  }
}

// export default function(state = initialState, action) {
//   switch (action.type) {
//     case FETCH_MUSEUMS:
//       return {
//         ...state,
//         museums: action.museums
//       }
//     default:
//       return state;
//   }
// }

// const museumReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case UPDATE_FORM:
//       return {
//         ...state,
//         [action.name]: action.value,
//       }
//     default:
//       return state;
//   }
// };

// export {
//   museumReducer
// };
