import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Homepage, ArtworkPage, EditMuseumPage } from './pages/index';
import store from './redux/store';
import { Nav } from './components/index';

class Application extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Nav />
          <Switch>
            <Route exact path="/museums" component={Homepage} />
            <Route exact path="/artwork" component={ArtworkPage} />
            <Route exact path="/museums/edit/:id" component={EditMuseumPage} />
            <Redirect to="/museums" />
          </Switch>
        </BrowserRouter>
      </Provider>
      
    )
  }
}

export default Application;
