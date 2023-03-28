import "./App.css";
import React from 'react';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import Home from './page/home';
import About from './page/about';
import Kontak from './page/kontak';
import Login from './page/login';


function App() {
  return (
    <>

    
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/kontak' element={<Kontak />} />
        <Route path='/login' element={<Login />} />
    </Routes>
    </>

  );
}

export default App;
