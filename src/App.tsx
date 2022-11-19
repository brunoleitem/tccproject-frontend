import React from 'react';
import { Router } from 'react-router-dom';
import { AppProvider } from './hooks'
import Routes from './routes';
import history from './services/history'

function App() {
  return (
    <AppProvider>
      <Router history={history}>
        <Routes />
      </Router>
    </AppProvider>
  );
}
export default App;