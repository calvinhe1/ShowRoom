import './App.css';
import React, { useState } from 'react';

import Header from './react-components/Header';

import Home from "./pages/Home";
import Login from "./pages/Login";
import ShowPage from "./pages/ShowPage";
import AdminHome from "./pages/AdminHome";
import UserList from "./pages/UserList";
import ShowList from "./pages/ShowList";
import Profile from "./pages/Profile";

import { Routes, Route, BrowserRouter } from 'react-router-dom';

function App() {

  //TODO this will come from the server
  const showList = [{showId: 0,
        picture: '/images/aot.jpg',
        title: 'Attack on Titan',
        genre: ['action', 'dark fantasy'],
        startDate: '2009-09-09',
        endDate: '2001-04-09',
        description: 'When giants attack'},
        
        {showId: 1,
        picture: '/images/death-note.jpg',
        title: 'Death Note',
        genre: ['Mystery', 'Supernatural thriller'],
        startDate: '2003-12-01',
        endDate: '2006-05-15',
        description: 'An angry twink finds a magical book called the death note'}];

  const [shows, setShows] = useState(showList);

  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path='/' element={<Home showList={shows}/>}/>
          <Route exact path='/login' element={<Login />}/>
          <Route path='/show_page/:id' element={<ShowPage showList={shows} />}/>
          <Route exact path='/admin_home' element={<AdminHome/>}/>
          <Route exact path='/user_list' element={<UserList/>}/>
          <Route exact path='/show_list' element={<ShowList/>}/>
          <Route exact path='/profile' element={<Profile/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
