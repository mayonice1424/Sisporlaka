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
import AdminJasaRaharjaLaporan from "./page/jasaRaharja/laporan";
import AdminDinkesLaporan from "./page/dinkes/laporan";
import AdminPolisiLaporan from "./page/polisi/laporan";
import AdminDishubLaporan from "./page/dishub/laporan";
import AdminRSLaporan from "./page/rumahsakit/laporan";
import AdminDishubValidasi from "./page/dishub/validasi";
import AdminJasaRaharjaGrafik from "./page/jasaRaharja/grafik";
import AdminPolisiGrafik from "./page/polisi/grafik";
import AdminDinkesGrafik from "./page/dinkes/grafik";
import AdminDishubGrafik from "./page/dishub/grafik";


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
        <Route path='jasa-raharja/laporan' element={<AdminJasaRaharjaLaporan />} />
        <Route path='jasa-raharja/grafik' element={<AdminJasaRaharjaGrafik />} />
        </Route>
        <Route path="/unit" element = {<Board />}>
        <Route path='polisi' element={<AdminPolisi />} />
        <Route path='polisi/laporan' element={<AdminPolisiLaporan />} />
        <Route path='polisi/grafik' element={<AdminPolisiGrafik />} />
        </Route>
        <Route path="/unit" element = {<Board />}>
        <Route path='dinas-kesehatan' element={<AdminDinkes />} />
        <Route path='dinas-kesehatan/laporan' element={<AdminDinkesLaporan />} />
        <Route path='dinas-kesehatan/grafik' element={<AdminDinkesGrafik />} />
        </Route>
        <Route path="/unit" element = {<Board />}>
        <Route path='dinas-perhubungan' element={<AdminDishub />} />
        <Route path='dinas-perhubungan/laporan' element={<AdminDishubLaporan />} />
        <Route path='dinas-perhubungan/validasi-laporan' element={<AdminDishubValidasi/>} />
        <Route path='dinas-perhubungan/grafik' element={<AdminDishubGrafik/>} />
        </Route>
        <Route path="/unit" element = {<Board />}>
        <Route path='rumah-sakit' element={<AdminRS />} />
        <Route path='rumah-sakit/laporan' element={<AdminRSLaporan />} />
        <Route path='rumah-sakit/grafik' element={<AdminDishubGrafik/>} />
        </Route>
        <Route path='*' element={<Notfound />} />
        </Routes>
    </>

  );
}

export default App;
