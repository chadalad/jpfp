import React, { Component } from 'react';
import axios from 'axios';
import store from '../../redux/store';
import { updateForm } from '../../redux/museums/index';

class CreateMuseum extends Component {
  state = {
    name: '',
    imageURL: '',
  };

  onChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { name, imageURL } = this.state;

    axios.post('/api/museums', {
      name,
      imageURL,
    })
      .then(({ data }) => {
        console.log('Create Museum Response: ', data)
      })
      .catch((e) => {
        console.error(e);
      });
  }

  render() {
    return (
      <form
        onSubmit={this.onSubmit}
      >
        <label>
          Name
          <input 
            name="name" 
            onChange={this.onChange}
          />
        </label>
        <label>
          Icon URL
          <input 
            name="imageURL" 
            onChange={this.onChange}
          />
        </label>
        <button> Create Museum </button>
      </form>
    )
  }
}

export default CreateMuseum;
