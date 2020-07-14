import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Homepage } from './pages/index';

class Application extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default Application;
