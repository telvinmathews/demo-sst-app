import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import NotFound from './pages/Home/NotFound/NotFound';
export default function Links() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path="*" element={<NotFound />} />;
    </Routes>
  );
}
