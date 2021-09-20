import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Auth from './components/Auth/Auth';
import Search from "./components/Search/Search";

const App = () => (
  <BrowserRouter>
    <Container maxWidth="lg">
      <Navbar />
      <Switch>
        <Route path="/" exact component={Auth} />
        <Route path="/auth" exact component={Auth} />
        <Route path="/search" exact component={Search} />
      </Switch>
    </Container>
  </BrowserRouter>
);

export default App;