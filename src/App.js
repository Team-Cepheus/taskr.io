import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginPage from './components/Login/LoginPage';
import DashboardPage from './components/DashboardPage';
import BoardPage from './components/BoardPage/BoardPage';


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' component={LoginPage} exact={true} />
        <Route path='/dashboard' component={DashboardPage} />
        <Route path='/board' component={BoardPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
