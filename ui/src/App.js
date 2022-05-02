import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import pages from './components/navigation/pages';
import CustomAppBar from './components/navigation/appBar';

import './App.css';

function App() {
  return (
    <>
      <Router>
        <CustomAppBar />
        <div className="app-container">
          <Switch>
            {pages.map(p =>
              <Route key={p.key} exact={p.exact} path={p.path}>
                {p.renderContent()}
              </Route>
            )}
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
