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
import Board from "./components/board/board";


function App() {
  return (
    <>
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/informasi' element={<Informasi />} />
        <Route path='/kontak' element={<Kontak />} />
        <Route path='/login' element={<Login />} />
        <Route path="/unit" element = {<Board />}>
        <Route path='jasa-raharja' element={<AdminJasaRaharja />} />
        </Route>
        <Route path="/unit" element = {<Board />}>
        <Route path='polisi' element={<AdminPolisi />} />
        </Route>
        <Route path="/unit" element = {<Board />}>
        <Route path='dinas-kesehatan' element={<AdminDinkes />} />
        </Route>
        <Route path="/unit" element = {<Board />}>
        <Route path='dinas-perhubungan' element={<AdminDishub />} />
        </Route>
        <Route path="/unit" element = {<Board />}>
        <Route path='rumah-sakit' element={<AdminRS />} />
        </Route>
        <Route path='*' element={<Notfound />} />
        </Routes>
    </>

  );
}

export default App;
