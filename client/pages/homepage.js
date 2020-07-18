import React, { Component } from 'react';
import { CreateMuseum, AddMuseum, MuseumList, EditMuseum } from '../components/index';
import { connect } from 'react-redux';

class Homepage extends Component {
  render() {
    return (
      <div>
        {/* <CreateMuseum /> */}
        <AddMuseum />
        {/* <EditMuseum /> */}
        <MuseumList />
        {/* Hello World! */}
      </div>
    )
  }
}



export default connect(null, {})(Homepage);
