import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createMuseum } from '../../redux/museums/museums.actions';

class AddMuseum extends Component {
  constructor (props) {
    super(props);

    this.state = {
      museumName: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const museum = {
      name: this.state.museumName
    };

    this.props.createMuseum(museum);

    this.setState({
      museumName: '',
    });
  }

  render() {
    return (
      <div className="box">
        <h3>Add Museum</h3>
        <form className="field" onSubmit={this.onSubmit}>
          <label className="label">
            Museum Name
            <input 
              className="input" 
              type="text" 
              name="museumName" 
              onChange={this.onChange}
              value={this.state.museumName} 
            />
          </label>
          <button className="button is-danger has-text-weight-bold" type="submit" >
            Add Museum
          </button>
        </form>
      </div>
    )
  }
}

AddMuseum.propTypes = {
  createMuseum: PropTypes.func.isRequired,  //  to see if called, go to actions and log
};

export default connect(null, { createMuseum })(AddMuseum);
