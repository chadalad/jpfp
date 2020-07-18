import React, { Component } from 'react';
import { connect } from 'react-redux';
import { EditMuseum } from '../components/index';

class EditMuseumPage extends Component {
  render() {
    return (
      <div>
        <EditMuseum />
      </div>
    );
  }
}

export default connect(null, {})(EditMuseumPage);
