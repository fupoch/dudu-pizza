import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import './scss/app.scss';
import Store from './pages/Store';
import Basket from './pages/Basket';
import Header from './components/Header';
import NotFound from './pages/NotFound';
import { useSelector, useDispatch } from 'react-redux';


function App() {

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" exact element={<Store />} />
          <Route path="Basket" element={<Basket />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
