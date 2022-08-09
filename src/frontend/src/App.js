import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React from 'react';
import Landing from './components/layout/Landing';
import Auth from './views/Auth';
import AuthContextProvider from './contexts/AuthContext';
import Dashboard from './views/Dashbord';
import ProtectedRoute from './components/routing/ProtectedRoute';
import About from './views/About';
import TaskContextProvider from './contexts/TaskContext';

function App() {
  return (
    <>
      <AuthContextProvider>
        <TaskContextProvider>
          <Router>
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/login" render={props => <Auth {...props} authRoute="login" />} />
              <Route exact path="/register" render={props => <Auth {...props} authRoute="register" />} />
              <ProtectedRoute exact path="/dashboard" component={Dashboard} />
              <ProtectedRoute exact path="/about" component={About} />
            </Switch>
          </Router>
        </TaskContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
