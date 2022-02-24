
import React, { useState } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

// import components
import Header from './react-components/Header';

// import pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import ShowPage from "./pages/ShowPage";
import AdminHome from "./pages/AdminHome";
import UserList from "./pages/UserList";
import ShowList from "./pages/ShowList";
import Profile from "./pages/Profile";

// contexts
import { ProvideUserProfileContext } from './contexts/UserProfile';


// import styling and assets
import './App.css';

function App() {

  return (
    <div>
      <ProvideUserProfileContext>
        <BrowserRouter>
        <Header />
          <Routes>
            <Route exact path='/' render={() => 
                              (<Home />)}/>
            <Route exact path='/login' render={() => 
                              (<Login />)}/>
            <Route exact path='/show_page' render={() => 
                              (<ShowPage />)}/>
            <Route exact path='/admin_home' render={() => 
                              (<AdminHome />)}/>
            <Route exact path='/user_list' render={() => 
                              (<UserList />)}/>
            <Route exact path='/show_list' render={() => 
                              (<ShowList />)}/>
            <Route exact path='/profile' render={() => 
                              (<Profile />)}/>
          </Routes>
        </BrowserRouter>
      </ProvideUserProfileContext>
    </div>
  );
}

export default App;
