import { 
  UPDATE_FORM, 
  FETCH_MUSEUMS, 
  NEW_MUSEUM, 
  DELETE_MUSEUM, 
  EDIT_MUSEUM,
  SET_MUSEUM_TO_SELECTED, 
} from './museums.types';
import axios from 'axios';

// export function fetchMuseums() {
//   return function (dispatch) {
//     axios.get('/api/museums')
//       .then(museums => dispatch({
//         type: FETCH_MUSEUMS,
//         payload: museums,
//       }));
//         // this.setState({museums: res.data.museums}));
//   }
// }

//same as above
export const fetchMuseums = () => async (dispatch) => {
  await axios.get('/api/museums')
    .then(async (res) => {
      console.log('fetch: ', Array.isArray(res.data.museums));
      dispatch({
        type: FETCH_MUSEUMS,
        museums: res.data.museums,
      });
    });
}

export const createMuseum = (museumData) => async (dispatch) => {
  console.log('action called')
  await axios.post('/api/museums', museumData)
  .then(async (res) => {
    console.log('post: ', res.data.museum)
    dispatch({
      type: NEW_MUSEUM,
      museum: res.data.museum,
    });
  });
}

export const setMuseumToSelected = (museumData) => async (dispatch) => {
  console.log('setMus -> name: ', museumData.name);
  dispatch({
    type: SET_MUSEUM_TO_SELECTED,
    currentMuseum: museumData,
  })
}

export const editMuseum = (museumData) => async (dispatch) => {
  console.log('edit action called');
  await axios.put('/api/museums', museumData)
    .then(async (res) => {
      console.log('put: ', res.data.museum)
      dispatch({
        type: EDIT_MUSEUM,
        museum: res.data.museum,
      });
    });
}

export const deleteMuseum = (museumData) => async (dispatch) => {
  const { id } = museumData;
  console.log('delete action called, museumId: ', id, ' obj: ', museumData);
  await axios.delete('/api/museums', { data: museumData })
    .then(async (res) => {
      console.log('delete: ', res.data);
      dispatch({
        type: DELETE_MUSEUM,
        id,
      })
    })
}


//thunks are actions
//actions be the whole big function. make the axios call and dispatch.
// does what it needs
const updateForm = (name, value) => ({
  type: UPDATE_FORM,
  name,
  value,
});

export {
  updateForm,
};
