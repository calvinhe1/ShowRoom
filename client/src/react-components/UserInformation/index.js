import "./styles.css"

import {useState} from "react";
import { uid } from "react-uid";

import { useUserProfileContext } from './../../contexts/UserProfile';

import UserCommentSection from "./../UserCommentSection";
import UserShowSection from "./../UserShowSection";
import { getUserInfo, modifyUser, removeUser } from "../../actions/user";

function UserInformation(props) {
    
    const [user, setUser] = useState({});
    if (Object.keys(user).length === 0) {
        getUserInfo(props._id).then((res) => {
            setUser(res);
        });
    }

    const changeUser = function(e) {
        e.preventDefault();
        user[e.target.name] = e.target.value;
        setUser(user);
    }    

    const loggedInUser = useUserProfileContext().profile;
    // If the user currently logged in is viewing their own account, they can modify it
    const myAccount = loggedInUser._id === props._id;

    const handleChangeProfile = function(e) {
        e.preventDefault();
        modifyUser(user).then(() => {
            alert('Info changed');
        });
    }

    const deleteAccount = function(e) {
        e.preventDefault();
        if (window.confirm("Are you sure you wish to delete your account forever? This cannot be undone")){
            removeUser(user._id);
        }
    }

    return (
        <div className='user-info'>
            <div className='profile-picture-div'>
                <img className='profile-picture' src={user.profilePicture} alt='Profile Picture'></img>
            </div>
            <div className='username-div'>
                <label>Username</label>
                <input type="text" value={user.username} name="username" disabled={!myAccount} onChange={changeUser}></input>
                { myAccount ? 
                    <div>
                        <button className='edit-link' onClick={handleChangeProfile}>Change Username</button>
                        <label>Password</label>
                        <input type="password" name="password" value={user.password} onChange={changeUser}></input>
                        <button className='edit-link' onClick={handleChangeProfile}>Change Password</button>
                    </div>
                    : null
                }
                <label>Bio</label>
                <input type="text" value={user.bio} name="bio" disabled={!myAccount} onChange={changeUser}></input>
                { myAccount ? 
                    <button className='edit-link' onClick={handleChangeProfile}>Change Bio</button>
                    : null
                }
                { myAccount ? 
                    <button onClick={deleteAccount}>Delete Account</button>
                    : null
                }
                </div>
            <div className='top-shows-div'>
                <h1>My Top Shows</h1>
                <UserShowSection></UserShowSection>
            </div>
            <div className='recent-comments-div'>
                <h1>Recent Comments</h1>
                <UserCommentSection></UserCommentSection>
            </div>
        </div>
    );
}

export default UserInformation;