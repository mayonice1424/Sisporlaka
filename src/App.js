import "./App.css";
import React from 'react';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import Home from './page/home';
import Informasi from './page/informasi';
import Kontak from './page/kontak';
import Login from './page/login';
import Notfound from './page/notfound';
import AdminDishub from "./page/dishub/dashboard";
import AdminDinkes from "./page/dinkes/dashboard";
import AdminJasaRaharja from "./page/jasaRaharja/dashboard";
import AdminPolisi from "./page/polisi/dashboard";
import AdminRS from "./page/rumahsakit/dashboard";
import Dashboard from "./page/Dashboard/dashboard";


function App() {
  return (
    <>
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/informasi' element={<Informasi />} />
        <Route path='/kontak' element={<Kontak />} />
        <Route path='/login' element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/pt-jasa-raharja' element={<AdminJasaRaharja />} />
        <Route path='/rs' element={<AdminRS />} />
        <Route path='/polisi' element={<AdminPolisi />} />
        <Route path='/dinkes' element={<AdminDinkes />} />
        <Route path='/dishub' element={<AdminDishub />} />
        <Route path='*' element={<Notfound />} />
        </Routes>
    </>

  );
}

export default App;
