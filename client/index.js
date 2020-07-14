import React from 'react';
import ReactDOM from 'react-dom';
import Application from './app';

const app = document.querySelector('#app');

ReactDOM.render(
  <Application />,
  app,
  () => {
    console.log('Application rendered!');
  },
)