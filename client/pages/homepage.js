import React, { Component } from 'react';
import { AddMuseum, MuseumList } from '../components/index';
import { connect } from 'react-redux';

class Homepage extends Component {
  render() {
    return (
      <div>
        <AddMuseum />
        <MuseumList />
      </div>
    )
  }
}

export default connect(null, {})(Homepage);
