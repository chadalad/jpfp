import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ArtworkList } from '../components/index';
import AddArtwork from '../components/artwork_add/artwork_add';

class ArtworkPage extends Component {
  render() {
    return (
      <div>
        <AddArtwork />
        <ArtworkList />
      </div>
    )
  }
}

export default connect(null, {})(ArtworkPage);
