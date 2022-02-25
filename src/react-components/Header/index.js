import {Link} from 'react-router-dom';
import "./styles.css";

/* The Header Component */
function Header(props) {

  return (
      <div className="header">
          <span className="header-left">
            <Link to="/">
              <h1 className="logo">ShowRoom</h1>
            </Link>
          </span>

          <span className="header-right">
            {
              props.currentUser?.isAdmin ?
              <Link to="/admin-home">
                <button className="manage-button">Manage</button>
              </Link>
              : null
            }
            {
              props.currentUser ? 
              <span>
                <button className="logout-button" onClick={props.signOut}>Logout</button>
                {/** TODO link to their actual profile */}
                <Link to="/profile">
                  <img src={props.currentUser.profilePicture} alt="profile picture" className="profile-pic"></img>
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