import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addSingleArtwork } from '../../redux/artworks/artworks.actions';

class AddArtwork extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      artist: '',
      yearCreated: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const artworkPost = {
      title: this.state.title,
      artist: this.state.artist,
      yearCreated: this.state.yearCreated,
    };

    this.props.addSingleArtwork(artworkPost);

    this.setState({
      title: '',
      artist: '',
      yearCreated: '',
    });
  }

  render() {
    return (
      <div className='box'>
        <h3>Add Artwork</h3>
        <form className='field' onSubmit={this.onSubmit}>
          <label className='label'>
            Title
            <input 
              className='input'
              type='text'
              name='title'
              onChange={this.onChange}
              value={this.state.title}
            />
          </label>
          <label className='label'>
            Artist
            <input 
              className='input'
              type='text'
              name='artist'
              onChange={this.onChange}
              value={this.state.artist}
            />
          </label>
          <label className='label'>
            Year
            <input 
              className='input'
              type='text'
              name='yearCreated'
              onChange={this.onChange}
              value={this.state.yearCreated}
            />
          </label>
          <button className='button is-danger has-text-weight-bold' type='submit'>
            Add Artwork
          </button>
        </form>
      </div>
    )
  }
}

AddArtwork.propTypes = {
  addSingleArtwork: PropTypes.func.isRequired,
};

export default connect(null, { addSingleArtwork })(AddArtwork);
// export default AddArtwork;
