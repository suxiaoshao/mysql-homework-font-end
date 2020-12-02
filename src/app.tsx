import './app.scss';
import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UserRoute from './view/user/router';
import AdminRoute from './view/admin/router';
import Home from './view/home/home';
import { useALlStation } from './util/store/allStation';
import { getAllStation } from './util/http/getAllStation';

export default function App(): JSX.Element {
  const [, setAllStation] = useALlStation();
  React.useEffect(() => {
    getAllStation().then((data) => {
      setAllStation(data);
    });
  }, []);
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/user">
          <UserRoute />
        </Route>
        <Route path="/admin">
          <AdminRoute />
        </Route>
      </Switch>
    </Router>
  );
}
