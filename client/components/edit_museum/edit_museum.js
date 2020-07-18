import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  fetchAvailableArtwork,
  fetchArtInCurrentMuseum,
  updateMuseumIdStatusOfArtwork,
  addSingleArtwork,
  deleteSingleArtwork,
} from '../../redux/artworks/artworks.actions';

class EditMuseum extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedArtworkId: '',
    }

    this.onArtworkSelection = this.onArtworkSelection.bind(this);
    this.onClickingAdd = this.onClickingAdd.bind(this);
  }
  
  componentDidMount() {
    this.props.fetchAvailableArtwork();
    this.props.fetchArtInCurrentMuseum(this.props.museum);
  }

  onArtworkSelection(e) {
    console.log(e.target.value);
    this.setState({ selectedArtworkId: e.target.value });
  }

  onClickingAdd(e) {
    e.preventDefault();
    this.props.updateMuseumIdStatusOfArtwork(this.state.selectedArtworkId, this.props.museum.id);
  }

  render() {
    console.log('EditMuseum component props: ', this.props);
    const { name } = this.props.museum;
    return (
      <div className='box'>
        <div className='columns'>
          <div className='column'>
            <h3 className='title is-3'>{name}</h3>
            <hr className='is-divider' />
            <div className='content'>
              <label className='label'>Current Collection:</label>
              <ul>{
                this.props.currentDisplay.length
                ?
                  this.props.currentDisplay.map(item => (
                    <li key={item.id} className='mr-2'>
                      {`'${item.title}' by ${item.artist} (${item.yearCreated})`}
                      {/* <a className="delete" onClick={() => this.props.deleteMuseum({id: museum.id})}></a> */}
                      {/* <a className='delete' onClick={() => console.log('delete')}></a> */}
                      <button className='button is-danger is-light is-small' onClick={(e) => {
                        this.props.addSingleArtwork({
                          title: item.title, 
                          artist: item.artist, 
                          yearCreated: item.yearCreated
                        });
                        this.props.deleteSingleArtwork({ id: item.id })
                      }}>Remove</button>
                    </li>
                  ))
                :
                  'There are currently no pieces on display.'
              }</ul>
            </div>
          </div>
          
          <div className='column'>
            <label className='label'>Add to the Collection:</label>
            <form className='field' onSubmit={this.onClickingAdd}>
              <div className='select mr-2' onChange={this.onArtworkSelection}>
                <select>
                  <option key='default'>Select Artwork</option>
                  {this.props.availableArtwork.map(art => (
                    <option key={art.id} value={art.id}>
                      {`'${art.title}' by ${art.artist} (${art.yearCreated})`}
                    </option>
                  ))}
                </select>
              </div>
              <button className='button is-danger has-text-weight-bold' type='submit'>Add</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  museum: state.museums.museum,
  availableArtwork: state.allArt.availableArtwork,
  currentDisplay: state.allArt.currentDisplay,
});

export default connect(mapStateToProps, { 
  fetchAvailableArtwork,
  fetchArtInCurrentMuseum,
  updateMuseumIdStatusOfArtwork,
  addSingleArtwork,
  deleteSingleArtwork,
})(EditMuseum);
