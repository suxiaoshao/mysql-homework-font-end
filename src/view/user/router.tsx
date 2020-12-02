import { Route } from 'react-router-dom';
import * as React from 'react';
import QueryTrains from './queryTrains/queryTrains';
import QueryTrip from './queryTrip/queryTrip';
import Contact from './contact/contact';

export default function UserRoute(): JSX.Element {
  return (
    <>
      <Route path="/user/queryTrains" exact>
        <QueryTrains />
      </Route>
      <Route path="/user/queryTrip" exact>
        <QueryTrip />
      </Route>
      <Route path="/user/contact" exact>
        <Contact />
      </Route>
    </>
  );
}
