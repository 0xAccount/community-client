import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from './views/Dashboard';
import Roadmap from './views/Roadmap';
import ResetComponent from './views/reset';


export const Routes = () => {

  return (
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/roadmap" component={Roadmap} />
      <Route exact path="/reset" component={ResetComponent} />
    </Switch>
  );
};