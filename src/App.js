import "./App.css";
import React from 'react';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import Home from './page/home';
import Informasi from './page/informasi';
import Kontak from './page/kontak';
import Login from './page/login';
import Dashboard from './page/dashboard';
import Notfound from './page/notfound';

import Board from './components/board/board';


function App() {
  return (
    <>
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/informasi' element={<Informasi />} />
        <Route path='/kontak' element={<Kontak />} />
        <Route path='/login' element={<Login />} />
        <Route path="/unit" element={<Board />}>
        <Route path='dashboard/:role' element={<Dashboard />} />
        </Route>
        <Route path='*' element={<Notfound />} />
        </Routes>
    </>

  );
}

export default App;
