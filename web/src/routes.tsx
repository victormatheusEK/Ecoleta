import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import Success from './pages/Success';
import Home from './pages/Home';
import CreateSpot from './pages/CreateSpot';

const Routes = () => {
  return (
    <Router>
      <Route component={Success} path="/sucesso" />
      <Route component={Home} path="/" exact />
      <Route component={CreateSpot} path="/create-spot" />
    </Router>
  );
};

export default Routes;
