import './App.css';
import React, { useState } from 'react';

import Header from './react-components/Header';

import Home from "./pages/Home";
import Login from "./pages/Login";
import ShowPageWrapper from "./pages/ShowPageWrapper";
import AdminHome from "./pages/AdminHome";
import UserList from "./pages/UserList";
import ShowList from "./pages/ShowList";
import Profile from "./pages/Profile";

import { Routes, Route, BrowserRouter } from 'react-router-dom';

function App() {

  //TODO this will all come from the server
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

  const userList = [{userId: 0, 
                     userName: 'admin', 
                     profilePicture: '/images/profile-picture.jpg',
                     isAdmin: true},
                    {userId: 1,
                     userName: 'user',
                     profilePicture: '/images/profile-picture.jpg',
                     isAdmin: false}];

  const commentList = [
      {showId: 0, userId: 0, text: 'Love this show', date: new Date().toDateString(), commentId: 0},
      {showId: 0, userId: 1, text: 'Me too!', date: new Date().toDateString(), commentId: 1},
      {showId: 1, userId: 0, text: 'Hate this show', date: new Date().toDateString(), commentId: 2},
      {showId: 1, userId: 1, text: 'It\'s not that bad', date: new Date().toDateString(), commentId: 3}
  ];

  const [shows, setShows] = useState(showList);
  const [users, setUsers] = useState(userList);
  const [comments, setComments] = useState(commentList);
  //TODO this will come from login page
  const [currentUser, setCurrentUser] = useState(users[0]);

  function changeShow(newShow) {
    const newShowList = showList.map(show => {
      return show.showId === newShow.showId ? newShow : show
    });

    setShows(newShowList);
    //TODO send show changes to server
  }

  function addComment(comment) {
    comments.push(comment);
    setComments(comments);
    //TODO send comment changes to server
  }

  function deleteComment(commentId) {
    const newComments = comments.filter(comment => comment.commentId !== commentId);
    setComments(newComments)
  }

  function signOut() {
    setCurrentUser(undefined);
  }

  return (
    <div>
      <BrowserRouter>
        <Header currentUser={currentUser} signOut={signOut}/>
        <Routes>
          <Route exact path='/' element={<Home shows={shows} />}/>
          <Route exact path='/login' element={<Login />}/>
          <Route path='/show_page/:id' element={<ShowPageWrapper shows={shows} currentUser={currentUser} comments={comments} changeShow={changeShow} addComment={addComment} deleteComment={deleteComment} users={users}/>}/>
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
