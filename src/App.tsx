import React from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import './App.css';
import './scss/app.scss';
import Store from './pages/Store';
import Basket from './pages/Basket';
import FullPizzas from './pages/FullPizzas';
import Header from './components/Header';
import NotFound from './pages/NotFound';
import { useSelector, useDispatch } from 'react-redux';
import MainLayout from './layouts/MainLayout';

function App() {
  const { id } = useParams()
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Store />} />
        <Route path="Basket" element={<Basket />} />
        <Route path="/pizza/:id" element={<FullPizzas />} />
        <Route path="*" element={<NotFound />} />
      </Route>

    </Routes>

  );
}

export default App;
