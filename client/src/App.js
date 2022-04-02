
import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

// import components
import Header from './react-components/Header';

// import pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from './pages/Signup';

import ShowPageWrapper from "./pages/ShowPageWrapper";
import {AdminHome, AdminManageShows, AdminManageUsers, AddShow, AddUser} from "./pages/AdminHome";
import UserList from "./pages/UserList";
import ShowList from "./pages/ShowList";
import Profile from "./pages/Profile";

import Seasons from "./pages/Seasons";

import PublicProfile from "./pages/PublicProfile";


// contexts
import { ProvideUserProfileContext } from './contexts/UserProfile';
import { ProvideUserListContext } from './contexts/UserList';
import { ProvideShowListContext } from './contexts/ShowList';
import { ProvideCommentListContext } from './contexts/CommentList';
import { ProvideShowRatingsListContext } from './contexts/ShowRatingList';
import { ProvideSeasonListContext } from './contexts/Season';
import { ProvideEpisodeListContext } from './contexts/EpisodeList';
import { ProvideEpisodeRatingsListContext } from './contexts/EpisodeRatingList';

// import styling and assets
import './App.css';

function App() {

  return (
    <div>
      {/* contexts, making the indent the same to prevent too many indents */}
      
      <ProvideUserProfileContext>
      <ProvideUserListContext>
      <ProvideShowListContext>
      <ProvideCommentListContext>
      <ProvideShowRatingsListContext>
      <ProvideSeasonListContext>
      <ProvideEpisodeListContext>
      <ProvideEpisodeRatingsListContext>
    

        {/* navigation */}
        <BrowserRouter>
          <Header/>
          <Routes>
            <Route exact path='/' element={<Home />}/>
            <Route exact path='/login' element={<Login />}/>
            <Route exact path='/signup' element={<Signup/>}/>
            <Route path='/show_page/:id' element={<ShowPageWrapper />}/>
            <Route exact path='/seasons' element={<Seasons />}/>
            <Route exact path='/admin_home' element={<AdminHome/>}/>
            <Route exact path='/admin_manage_users' element={<AdminManageUsers/>}/>
            <Route exact path='/admin_manage_shows' element={<AdminManageShows />} />
            <Route exact path='/add_new_show' element={<AddShow/>}/>
            <Route exact path='/add_new_user' element={<AddUser/>}/>
            <Route exact path='/user_list' element={<UserList/>}/>
            <Route exact path='/show_list' element={<ShowList/>}/>
            <Route path='/profile/:id' element={<Profile/>}/>
            <Route exact path='/user' element={<PublicProfile/>}/>

          </Routes>
        </BrowserRouter>
      </ProvideEpisodeRatingsListContext>
      </ProvideEpisodeListContext>
      </ProvideSeasonListContext>
      </ProvideShowRatingsListContext>
      </ProvideCommentListContext>
      </ProvideShowListContext>
      </ProvideUserListContext>
      </ProvideUserProfileContext>
  
  
    </div>
  );
}

export default App;
