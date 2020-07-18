import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Artwork } from '../index';
import { fetchAllArtwork } from '../../redux/artworks/artworks.actions';

class ArtworkList extends Component {
  componentDidMount() {
    this.props.fetchAllArtwork();
  }

  render() {
    const artworkItems = this.props.allArt.map((artPiece) => <Artwork key={artPiece.id} deetz={artPiece} />)
    return (
      <div>
        <h3 className='title is-3'>Artwork</h3>
        {artworkItems}
      </div>
    )
  }
}

ArtworkList.propTypes = {
  fetchAllArtwork: PropTypes.func.isRequired,
  allArt: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  allArt: state.allArt.allArtwork,
});

export default connect(mapStateToProps, { fetchAllArtwork })(ArtworkList);
