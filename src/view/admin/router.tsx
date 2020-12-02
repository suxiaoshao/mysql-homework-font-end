import React from 'react';
import { Route } from 'react-router-dom';
import Station from './station/station';
import GetRide from './getRide/getRide';
import Train from './train/train';
import Trip from './trip/trip';
import Passengers from './passengers/passengers';

export default function AdminRoute(): JSX.Element {
  return (
    <React.Fragment>
      <Route path="/admin/station" exact>
        <Station />
      </Route>
      <Route path="/admin/getRide" exact>
        <GetRide />
      </Route>
      <Route path="/admin/train" exact>
        <Train />
      </Route>
      <Route path="/admin/trip" exact>
        <Trip />
      </Route>
      <Route path="/admin/passengers" exact>
        <Passengers />
      </Route>
      <Route path="/admin/login" exact>
        管理员登陆
      </Route>
    </React.Fragment>
  );
}
