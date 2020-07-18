import { 
  FETCH_MUSEUMS, 
  NEW_MUSEUM, 
  DELETE_MUSEUM, 
  EDIT_MUSEUM,
  SET_MUSEUM_TO_SELECTED, 
} from './museums.types';
import axios from 'axios';

export const fetchMuseums = () => async (dispatch) => {
  await axios.get('/api/museums')
    .then(async (res) => {
      dispatch({
        type: FETCH_MUSEUMS,
        museums: res.data.museums,
      });
    });
}

export const createMuseum = (museumData) => async (dispatch) => {
  await axios.post('/api/museums', museumData)
  .then(async (res) => {
    dispatch({
      type: NEW_MUSEUM,
      museum: res.data.museum,
    });
  });
}

export const setMuseumToSelected = (museumData) => async (dispatch) => {
  dispatch({
    type: SET_MUSEUM_TO_SELECTED,
    currentMuseum: museumData,
  })
}

export const editMuseum = (museumData) => async (dispatch) => {
  await axios.put('/api/museums', museumData)
    .then(async (res) => {
      dispatch({
        type: EDIT_MUSEUM,
        museum: res.data.museum,
      });
    });
}

export const deleteMuseum = (museumData) => async (dispatch) => {
  const { id } = museumData;
  await axios.delete('/api/museums', { data: museumData })
    .then(async (res) => {
      dispatch({
        type: DELETE_MUSEUM,
        id,
      })
    })
}
