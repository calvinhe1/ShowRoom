import React, {useState} from "react";

import {Link} from 'react-router-dom';
import "./styles.css";

/* The Header Component */
function Header() {
  
  // TODO retrieve user from context
  //const [user, setUser] = useState(null);
  const [user, setUser] = useState({userName: 'user', 
                                    profilePicture: '/images/profile-picture.jpg',
                                    isAdmin: true});

  function handleLogout(e) {
    e.preventDefault();
    setUser(null);
  }

  return (
      <div className="header">
          <span className="header-left">
            <Link to="/">
              <h1 className="logo">ShowRoom</h1>
            </Link>
          </span>

          <span className="header-right">
            {
              user?.isAdmin ?
              <Link to="/admin-home">
                <button className="manage-button">Manage</button>
              </Link>
              : null
            }
            {
              user ? 
              <span>
                <button className="logout-button" onClick={handleLogout}>Logout</button>
                <Link to="/profile">
                  <img src={user.profilePicture} alt="profile picture" className="profile-pic"></img>
                </Link>
              </span> : 
              <Link to="/login">
                <button className="login-button">Login</button>
              </Link>
            }
          </span>
      </div>
  );
}

export default Header;