import React, { FC } from 'react';
import './App.css';
import Dashboard from './pages/Dashboard/Components/Dashboard';

import { createBrowserHistory } from 'history';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './pages/Login/Login';
import axios from 'axios';

const hist = createBrowserHistory();

const baseDomain = 'https://jupy.iwanhae.kr/v1';
const baseURL = `${baseDomain}`;

export const client = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' },
});

client.interceptors.request.use((request) => {
  console.log('Starting Request', JSON.stringify(request, null, 2));
  return request;
});

client.interceptors.response.use((response) => {
  console.log('Response:', JSON.stringify(response, null, 2));
  return response;
});

const App: FC = () => (
  <div className="App">
    <Router history={hist}>
      <Switch>
        <Route path="/login">
          <Login></Login>
        </Route>
        <Route
          path="/dashboard"
          render={(props) => <Dashboard {...props}></Dashboard>}
        />
        <Redirect from="/" to="/login" />
      </Switch>
    </Router>
  </div>
);

export default App;
