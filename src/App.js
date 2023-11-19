import React from 'react';
import './App.css';
import UserList from './UserList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreateUser from './CreateUser';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path="/" element={ <UserList />} />
        <Route path="/create-user" element={ <CreateUser />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;