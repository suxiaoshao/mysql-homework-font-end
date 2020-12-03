import React from 'react';
import { Route } from 'react-router-dom';
import Station from './station/station';
import GetRide from './getRide/getRide';
import Train from './train/train';
import Travel from './travel/travel';
import Passengers from './passengers/passengers';
import LoginDialog from './components/login/loginDialog';

export default function AdminRoute(): JSX.Element {
  return (
    <React.Fragment>
      <LoginDialog />
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
        <Travel />
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
