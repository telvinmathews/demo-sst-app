/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState, useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';
import Nav from 'react-bootstrap/Nav';
import { useNavigate } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import onError from './lib/errorLib';
import Routes from './Routes';
import './App.css';
import { AppContext } from './lib/contextLib';

function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    } catch (e) {
      if (e !== 'No current user') {
        onError(e);
      }
    }

    setIsAuthenticating(false);
  }

  async function handleLogout() {
    await Auth.signOut();

    userHasAuthenticated(false);

    nav('/login');
  }

  return (
    !isAuthenticating && (
      <div className='App container py-3'>
        <Navbar collapseOnSelect bg='light' expand='md' className='mb-3 px-3'>
          <LinkContainer to='/'>
            <Navbar.Brand className='fw-bold text-muted'>Scratch</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle />
          <Navbar.Collapse className='justify-content-end'>
            <Nav activeKey={window.location.pathname}>
              {isAuthenticated ? (
                <>
                  <LinkContainer to='/settings'>
                    <Nav.Link>Settings</Nav.Link>
                  </LinkContainer>
                  <Nav.Link onClick={() => handleLogout()}>Logout</Nav.Link>
                </>
              ) : (
                <>
                  <LinkContainer to='/signup'>
                    <Nav.Link>Signup</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/login'>
                    <Nav.Link>Login</Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
          <Routes />
        </AppContext.Provider>
      </div>
    )
  );
}

export default App;
