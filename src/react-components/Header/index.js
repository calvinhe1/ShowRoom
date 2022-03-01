import {Link} from 'react-router-dom';
import "./styles.css";

import { useUserProfileContext } from '../../contexts/UserProfile';

/* The Header Component */
function Header(props) {
  
  // retrieve user from context
  const userProfile = useUserProfileContext();


  function handleLogout(e){
    userProfile.setIsLoggedIn(false)
    
  }

  return (
    userProfile.isLoggedIn ? 
    ////////////////////// LOGGED IN VIEW //////////////////////
      <div className="header">
          <span className="header-left">
            <Link to="/">
              <h1 className="logo">ShowRoom</h1>
            </Link>
          </span>

          <span className="header-right">
            {
              userProfile.profile.isAdmin ?
              <Link to="/admin-home">
                <button className="manage-button">Manage</button>
              </Link>
              : null
            }
            <span>
              <Link to="/">
                <button className="logout-button" onClick={handleLogout}>Logout</button>
              </Link>
              <Link to="/profile">
                <img src={userProfile.profile.profilePicture} alt="profile picture" className="profile-pic"></img>
              </Link>
            </span>
          </span>
      </div>
    :
    ///////////////////////// LOGGED OUT VIEW /////////////////////////
    <div className="header">
          <span className="header-left">
            <Link to="/">
              <h1 className="logo">ShowRoom</h1>
            </Link>
          </span>

          <span className="header-right">
            {
              userProfile.profile.isAdmin ?
              <Link to="/admin-home">
                <button className="manage-button">Manage</button>
              </Link>
              : null
            }
            <Link to="/login">
              <button className="login-button">Login</button>
            </Link>
          </span>
      </div>

  );
}

export default Header;