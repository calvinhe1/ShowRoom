import {Link} from 'react-router-dom';
import "./styles.css";

import { useUserProfileContext } from '../../contexts/UserProfile';
import Search from '../Search';

/* The Header Component */
function Header(props) {
  
  // retrieve user from context
  const userProfile = useUserProfileContext();

  const DEFAULT_IMAGE = "/images/profile-picture.jpg";

  function handleLogout(e){
    userProfile.logout();
  }

  return (
    userProfile?.profile?._id ? 
    ////////////////////// LOGGED IN VIEW //////////////////////
      <div className="header logged-in">
          <span className="header-left">
            <Link to="/">
            <img className = "header-logo" alt="ShowRoom Logo" src="/images/ShowRoomLogo.png"/>
            </Link>
          </span>

          <span className="header-right">
            {
              userProfile.profile.isAdmin ?
              <Link to="/admin_manage_shows">
                <button className="manage-button">Manage</button>
              </Link>
              : null
            }
            <Link to="/">
              <button className="logout-button" onClick={handleLogout}>Logout</button>
            </Link>
            <Link to={"/profile/" + userProfile.profile._id}>
              <img src={userProfile.profile.image_url || DEFAULT_IMAGE} alt="profile picture" className="profile-pic"></img>
            </Link>
            <Search></Search>
          </span>
      </div>
    :
    ///////////////////////// LOGGED OUT VIEW /////////////////////////
    <div className="header">
          <span className="header-left">
            <Link to="/">
            <img className = "header-logo" alt="ShowRoom Logo" src="/images/ShowRoomLogo.png"/>
            </Link>
          </span>

          <span className="header-right">
            <Link to="/login">
              <button className="login-button">Login</button>
            </Link>
            <Link to="/signup">
              <button className="login-button">Signup</button>
            </Link>
            <Search></Search>
          </span>
      </div>

  );
}

export default Header;