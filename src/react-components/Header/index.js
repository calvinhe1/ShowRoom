import {Link} from 'react-router-dom';
import "./styles.css";

import { useUserProfileContext } from '../../contexts/UserProfile';

/* The Header Component */
function Header(props) {
  
  // retrieve user from context
  const userProfile = useUserProfileContext();


  function handleLogin(e){
    if (userProfile.isLoggedIn){
      userProfile.setIsLoggedIn(false);
    } else {
      userProfile.setIsLoggedIn(true);
    }
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
              <Link to="/admin_home">
                <button className="manage-button">Manage</button>
              </Link>
              : null
            }
            <span>
              <button className="logout-button" onClick={handleLogin}>Logout</button>
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
            { /** TODO login page <Link to="/login"> */}
              <button className="login-button" onClick={handleLogin}>Login</button>
            { /** </Link> */}
          </span>
      </div>

  );
}

export default Header;