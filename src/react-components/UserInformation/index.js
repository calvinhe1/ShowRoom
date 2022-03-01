import "./styles.css"

import {useState} from "react";
import { uid } from "react-uid";

function UserInformation(props) {

    return (
        <div className='user-info'>
            <div className='profile-picture-div'>
                <img className='profile-picture' src={props.user.profilePicture} alt='Profile Picture'></img>
            </div>
            <div className='username-div'>
                <h1>Username: {props.user.userName}</h1>
                <button className='edit-link' href="">Change Username</button>
                <button className='edit-link' href="">Change Password</button>
                <button className='edit-link' href="">Delete Account</button>
            </div>
            <div className='top-shows-div'>
                <h1>My Top Shows</h1>
            </div>
            <div className='recent-comments-div'>
                <h1>Recent Comments</h1>
            </div>
        </div>
    );
}

export default UserInformation;