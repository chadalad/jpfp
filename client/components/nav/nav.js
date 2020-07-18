import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Nav extends Component {
  render() {
    return (
      <div>
        <div className='hero is-danger is-bold'>
          <div className='hero-body'>
            <div className='container'>
              <h1 className='title is-2'>
                L'Art
              </h1>
            </div>
          </div>
        </div>
        <nav className='navbar is-dark'>
          {/* <div className='navbar-start'>
              <a className='navbar-item'>Home</a>
              <Link to='/museums' className='navbar-item'>Museums</Link>
              <Link to='/artwork' className='navbar-item'>Artwork</Link>
            </div> */}
          <div className='navbar-menu is-active'>
            <div className='navbar-start'>
              <Link to='/museums' className='navbar-item has-text-weight-bold'>Museums</Link>
              <Link to='/artwork' className='navbar-item has-text-weight-bold'>Artwork</Link>
            </div>
          </div>
        </nav>
      </div>
      
    )
  }
}

export default Nav;
