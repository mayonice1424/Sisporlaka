import "./App.css";
import React from 'react';
import { BrowserRouter ,Routes, Route } from 'react-router-dom';
import Home from './page/home';
import PublicLaporan from "./page/laporan";
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
import AdminRSGrafik from "./page/rumahsakit/grafik";
import AddLaporanRS from "./page/rumahsakit/addLaporan";
import AddLaporanDinkes from "./page/dinkes/addLaporan";
import AddLaporanPolisi from "./page/polisi/addLaporan";
import DetailLaporanPolisi from "./page/polisi/detailLaporan";
import TambahPengemudiLaporanPolisi from "./page/polisi/tambahPengemudiLaporan";
import TambahKorbanLaporanPolisi from "./page/polisi/tambahKorbanLaporan";
import DetailLaporanRS from "./page/rumahsakit/detailLaporan";
import DetailLaporanDinkes from "./page/dinkes/detailLaporan";
import TambahKorbanLaporanJasaRaharja from "./page/jasaRaharja/tambahKorbanLaporan";
import EditKorbanLaporanJasaRaharja from "./page/jasaRaharja/editLaporan";
import EditKorbanLaporanDinkes from "./page/dinkes/editLaporan";
import EditKorbanLaporanRS from "./page/rumahsakit/editLaporan";
import EditKorbanLaporanPolisi from "./page/polisi/editLaporan";
import EditLaporanPolisi from "./page/polisi/editFormLaporan";
import EditLaporanRS from "./page/rumahsakit/editFormLaporan";
import EditLaporanDinkes from "./page/dinkes/editFormLaporan copy";
function App() {
  return (
    <>
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/informasi' element={<Informasi />} />
        <Route path='/kontak' element={<Kontak />} />
        <Route path='/login' element={<Login />} />
        <Route path='/laporan/:id' element={<PublicLaporan />} />
        <Route path="/unit" element = {<Board />}>
        <Route path='jasa-raharja' element={<AdminJasaRaharja />} />
        <Route path='jasa-raharja/laporan' element={<AdminJasaRaharjaLaporan />} />
        <Route path='jasa-raharja/tambah-korban-laporan/:id' element={<TambahKorbanLaporanJasaRaharja />} />
        <Route path='jasa-raharja/edit-korban-laporan/:id' element={<EditKorbanLaporanJasaRaharja />} />
        <Route path='jasa-raharja/grafik' element={<AdminJasaRaharjaGrafik />} />
        </Route>
        <Route path="/unit" element = {<Board />}>
        <Route path='polisi' element={<AdminPolisi />} />
        <Route path='polisi/laporan' element={<AdminPolisiLaporan />} />
        <Route path='polisi/laporan/add' element={<AddLaporanPolisi />} />
        <Route path='polisi/grafik' element={<AdminPolisiGrafik />} />
        <Route path='polisi/detail-laporan/:id' element={<DetailLaporanPolisi />} />
        <Route path='polisi/tambah-pengemudi-laporan/:id' element={<TambahPengemudiLaporanPolisi />} />
        <Route path='polisi/tambah-korban-laporan/:id' element={<TambahKorbanLaporanPolisi />} />
        <Route path='polisi/edit-korban-laporan/:id' element={<EditKorbanLaporanPolisi />} />
        <Route path='polisi/edit-laporan/:id' element={<EditLaporanPolisi />} />
        </Route>
        <Route path="/unit" element = {<Board />}>
        <Route path='dinas-kesehatan' element={<AdminDinkes />} />
        <Route path='dinas-kesehatan/laporan' element={<AdminDinkesLaporan />} />
        <Route path='dinas-kesehatan/laporan/add' element={<AddLaporanDinkes />} />
        <Route path='dinas-kesehatan/edit-korban-laporan/:id' element={<EditKorbanLaporanDinkes />} />
        <Route path='dinas-kesehatan/edit-laporan/:id' element={<EditLaporanDinkes />} />
        <Route path='dinas-kesehatan/detail-laporan/:id' element={<DetailLaporanDinkes />} />
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
        <Route path='rumah-sakit/detail-laporan/:id' element={<DetailLaporanRS />} />
        <Route path='rumah-sakit/laporan/add' element={<AddLaporanRS />} />
        <Route path='rumah-sakit/edit-korban-laporan/:id' element={<EditKorbanLaporanRS />} />
        <Route path='rumah-sakit/edit-laporan/:id' element={<EditLaporanRS />} />
        <Route path='rumah-sakit/grafik' element={<AdminRSGrafik/>} />
        </Route>
        <Route path='*' element={<Notfound />} />
        </Routes>
    </>
  );
}

export default App;
