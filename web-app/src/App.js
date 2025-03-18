import React from 'react';
import { useSelector } from 'react-redux';
import Login from './components/Login';
import Game from './components/Game';

const App = () => {
    const { user } = useSelector((state) => state.auth);
   
    return <div>{user ? <Game /> : <Login />}</div>;
};

export default App;
