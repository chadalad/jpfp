import { UPDATE_FORM } from './museums.types';

const initialState = {
  name: '',
  imageURL: '',
};

const museumReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_FORM:
      return {
        ...state,
        [action.name]: [action.value],
      }
    default:
      return state;
  }
};

export {
  museumReducer
};
