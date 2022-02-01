import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from './views/Dashboard';


export const Routes = () => {

  return (
    <Switch>
      <Route exact path="/" component={Dashboard} />
    </Switch>
  );
};