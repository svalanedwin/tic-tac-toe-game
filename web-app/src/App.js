import React from 'react';
import { useSelector } from 'react-redux';
import Login from './components/Login';
import Game from './components/Game';
import ErrorBoundary from './ErrorBoundary';

const App = () => {
  const { user } = useSelector((state) => state.auth);

  return <div>{user ? <ErrorBoundary>
    <Game />
  </ErrorBoundary> : <Login />}</div>;
};

export default App;