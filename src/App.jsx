import { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Checkout from './pages/Checkout';
import { Navbar } from './components/Navbar';

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path={'/'} element={<Home />} />
        <Route path={'/auth'} element={<Auth />} />
        <Route path={'/checkout'} element={<Checkout />} />
      </Routes>
    </div>
  );
}
