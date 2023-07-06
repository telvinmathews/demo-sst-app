/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Home from './pages/Home/Home';
import NewNote from './pages/NewNote/NewNote';
import Notes from './pages/Notes/Notes';
import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute';
import UnauthenticatedRoute from './components/UnauthenticatedRoute/UnauthenticatedRoute';
import Settings from './pages/Settings/Settings';

import NotFound from './pages/Home/NotFound/NotFound';

export default function Links() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='*' element={<NotFound />} />;
      <Route
        path='/login'
        element={
          <UnauthenticatedRoute>
            <Login />
          </UnauthenticatedRoute>
        }
      />
      <Route
        path='/signup'
        element={
          <UnauthenticatedRoute>
            <Signup />
          </UnauthenticatedRoute>
        }
      />
      <Route
        path='/settings'
        element={
          <AuthenticatedRoute>
            <Settings />
          </AuthenticatedRoute>
        }
      />
      <Route
        path='/notes/new'
        element={
          <AuthenticatedRoute>
            <NewNote />
          </AuthenticatedRoute>
        }
      />
      <Route
        path='/notes/:id'
        element={
          <AuthenticatedRoute>
            <Notes />
          </AuthenticatedRoute>
        }
      />{' '}
    </Routes>
  );
}
