
import React, { useState } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

// import components
import Header from './react-components/Header';

// import pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import ShowPageWrapper from "./pages/ShowPageWrapper";
import {AdminHome, AdminManageShows, AdminManageUsers, AddShow, AddUser} from "./pages/AdminHome";
import UserList from "./pages/UserList";
import ShowList from "./pages/ShowList";
import Profile from "./pages/Profile";

// contexts
import { ProvideUserProfileContext } from './contexts/UserProfile';
import { ProvideUserListContext } from './contexts/UserList';

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

  function addShow() {
    const uid = Math.floor(Math.random() * 100000);
    const newShow = {
      showId: uid
    };
    shows.push(newShow);
    setShows(shows);
    return uid;
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
      {/* contexts, making the indent the same to prevent too many indents */}
      <ProvideUserProfileContext>
      <ProvideUserListContext>

        {/* navigation */}
        <BrowserRouter>
          <Header/>
          <Routes>
            <Route exact path='/' element={<Home shows={shows} />}/>
            <Route exact path='/login' element={<Login />}/>
            <Route path='/show_page/:id' element={<ShowPageWrapper shows={shows} comments={comments} changeShow={changeShow} addComment={addComment} deleteComment={deleteComment} users={users}/>}/>
            <Route exact path='/admin_home' element={<AdminHome/>}/>
            <Route exact path='/admin_manage_users' element={<AdminManageUsers/>}/>
            <Route exact path='/admin_manage_shows' element={<AdminManageShows addShow={addShow}/>} />
            <Route exact path='/add_new_show' element={<AddShow/>}/>
            <Route exact path='/add_new_user' element={<AddUser/>}/>
            <Route exact path='/user_list' element={<UserList/>}/>
            <Route exact path='/show_list' element={<ShowList/>}/>
            <Route exact path='/profile' element={<Profile/>}/>
            
          </Routes>
        </BrowserRouter>

      </ProvideUserListContext>
      </ProvideUserProfileContext>
    </div>
  );
}

export default App;
