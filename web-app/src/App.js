import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './components/Login';
import Game from './components/Game';
import ErrorBoundary from './ErrorBoundary';

const App = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/game" /> : <Login />} />
        <Route path="/game" element={user ? <ErrorBoundary><Game /></ErrorBoundary> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
