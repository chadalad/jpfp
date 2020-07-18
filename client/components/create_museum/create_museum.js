import React, { Component } from 'react';
import axios from 'axios';
import store from '../../redux/store';
import { updateForm } from '../../redux/museums/index';

class CreateMuseum extends Component {
  constructor() {
    super();

    const { name, imageURL } = store.getState();

    this.state = {
      name,
      imageURL,
    };

    store.subscribe(() => {
      const { name, imageURL } = store.getState();

      this.setState({
        name,
        imageURL
      });
    })
  }

  onChange = ({ target: { name, value } }) => {
    store.dispatch(updateForm(name, value));
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { name, imageURL } = this.state;

    axios.post('/api/museums', {
      name,
      imageURL,
    })
      .then(({ data }) => {
        //once the data is set, add that to the museum list, but that's a separate component
        console.log('Create Museum Response: ', data)
      })
      .catch((e) => {
        console.error(e);
      });
  }

  //do verification on the local state.
  //ask self - does any other part of website need to know about this form data

  render() {
    const { name, imageURL } = this.state;

    return (
      <div className="box">
        <form className="field"
          onSubmit={this.onSubmit}
        >
          <label className="label">
            Museum Name
            <input className="input"
              name="name" 
              onChange={this.onChange}
              value={name}
            />
          </label>
        
          <label className="label">
            Icon URL
            <input className="input"
              name="imageURL" 
              onChange={this.onChange}
              value={imageURL}
            />
          </label>
          
          <button className="button is-danger has-text-weight-bold"> Create Museum </button>
        </form>
      </div>
      
    )
  }
}

export default CreateMuseum;
