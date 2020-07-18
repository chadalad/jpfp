import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteSingleArtwork } from '../../redux/artworks/artworks.actions';
import PropTypes from 'prop-types';

class Artwork extends Component {
  constructor (props) {
    super(props);

  }

  render() {
    return (
      <div className='box'>
        <button className='delete is-pulled-right' onClick={() => this.props.deleteSingleArtwork(this.props.deetz)}></button>
        <p className='title is-4'>{this.props.deetz.title}</p>
        <p className=''>Artist: {this.props.deetz.artist}</p>
        <p className=''>Year: {this.props.deetz.yearCreated}</p>
        <p className=''>{
          this.props.deetz.museumId
          ?
            `Currently on display.`
          :
            `Currently not on display.`
        }</p>
        {console.log(this.props)}
      </div>
    )
  }
}

export default connect(null, { deleteSingleArtwork })(Artwork);
