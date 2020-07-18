import axios from 'axios';
import { 
  FETCH_ALL_ARTWORK, 
  ADD_SINGLE_ARTWORK, 
  DELETE_SINGLE_ARTWORK,
  FETCH_AVAILABLE_ARTWORK,
  FETCH_ART_IN_CURRENT_MUSEUM,
  UPDATE_MUSEUM_ID_STATUS_OF_ARTWORK,
} from './artworks.types';

// export function fetchAllArtwork() {
//   return function(dispatch) {
//     axios.get('/api/artwork')
//       .then(res => dispatch({
//         type: FETCH_ALL_ARTWORK,
//         fetchedArt: res.data.artwork,
//       }));
//   }
// }

export const fetchAllArtwork = () => async (dispatch) => {
  console.log('fetchArts')
  await axios.get('/api/artwork')
    .then(async (res) => dispatch({
      type: FETCH_ALL_ARTWORK,
      fetchedArt: res.data.artwork,
    }));
}

export const fetchAvailableArtwork = () => async (dispatch) => {
  console.log('fetchAvailable');
  await axios.get('/api/artwork/available')
    .then(async (res) => dispatch({
      type: FETCH_AVAILABLE_ARTWORK,
      available: res.data.availableArt,
    }));
}

export const fetchArtInCurrentMuseum = (currentMuseum) => async (dispatch) => {
  console.log(currentMuseum)
  const currentMuseumId = currentMuseum.id;
  console.log(currentMuseumId)
  // await axios.get('/api/artwork/onDisplayHere', { params: currentMuseum })
  //   .then(async (res) => dispatch({
  //     type: FETCH_ART_IN_CURRENT_MUSEUM,
  //     displayed: res.data.displayed,
  //   }));
  await axios.get(`/api/artwork/onDisplayHere/${currentMuseum.id}`)
  .then(async (res) => dispatch({
    type: FETCH_ART_IN_CURRENT_MUSEUM,
    displayed: res.data.displayed,
  }));
  // await axios.get('/api/artwork/onDisplayHere', { params: { id: currentMuseumId } })
  //   .then(async (res) => dispatch({
  //     type: FETCH_ART_IN_CURRENT_MUSEUM,
  //     displayed: res.data.displayed,
  //   }));
}

export const addSingleArtwork = (artworkData) => async (dispatch) => {
  console.log('postArt')
  await axios.post('/api/artwork', artworkData)
    .then(async (res) => dispatch({
      type: ADD_SINGLE_ARTWORK,
      postedArt: res.data.artwork,
    }));
}

export const updateMuseumIdStatusOfArtwork = (artId, museumId) => async (dispatch) => {
  console.log('update art for mus id')
  await axios.put('/api/artwork/museumIdUpdate', { idArt: artId, idMuseum: museumId })
    .then(async (res) => {
        console.log('res.data updated art: ', res.data)
        dispatch({
          type: UPDATE_MUSEUM_ID_STATUS_OF_ARTWORK,
          id: artId,
          updatedArt: res.data.updatedMusIdArt,
        })
      }
      
    );
}

export const deleteSingleArtwork = (artworkData) => async (dispatch) => {
  const { id } = artworkData;
  console.log('deleteArt');
  await axios.delete('/api/artwork', { data: artworkData })
    .then(async (res) => dispatch({
      type: DELETE_SINGLE_ARTWORK,
      id,
    }))
}