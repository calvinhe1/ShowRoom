
import React, { useState } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

// import components
import Header from './react-components/Header';

// import pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import ShowPageWrapper from "./pages/ShowPageWrapper";
import {AdminHome, AdminManageShows, AdminManageUsers, addShow, addUser} from "./pages/AdminHome";
import UserList from "./pages/UserList";
import ShowList from "./pages/ShowList";
import Profile from "./pages/Profile";

// contexts
import { ProvideUserProfileContext } from './contexts/UserProfile';

// mock data
import { showList, userList, commentList } from './local-data';

// import styling and assets
import './App.css';

function App() {

  const [shows, setShows] = useState(showList);
  const [users, setUsers] = useState(userList);
  const [comments, setComments] = useState(commentList);

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
    //TODO send comment changes to server
  }

  return (
    <div>
      <ProvideUserProfileContext>
        <BrowserRouter>
          <Header/>
          <Routes>
            <Route exact path='/' element={<Home shows={shows} />}/>
            <Route exact path='/login' element={<Login />}/>
            <Route path='/show_page/:id' element={<ShowPageWrapper shows={shows} comments={comments} changeShow={changeShow} addComment={addComment} deleteComment={deleteComment} users={users}/>}/>
            <Route exact path='/admin_home' element={<AdminHome/>}/>
            <Route exact path='/admin_manage_users' element={<AdminManageUsers/>}/>
            <Route exact path='/admin_manage_shows' element={<AdminManageShows/>}/>
            <Route exact path='/add_new_show' element={<addShow/>}/>
            <Route exact path='/add_new_user' element={<addUser/>}/>
            <Route exact path='/user_list' element={<UserList/>}/>
            <Route exact path='/show_list' element={<ShowList/>}/>
            <Route exact path='/profile' element={<Profile/>}/>
            
          </Routes>
        </BrowserRouter>
      </ProvideUserProfileContext>
    </div>
  );
}

export default App;
