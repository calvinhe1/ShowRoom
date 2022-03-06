import "./styles.css"

import {useState} from "react";
import { uid } from "react-uid";

import { useUserProfileContext } from './../../contexts/UserProfile';

import UserCommentSection from "./../UserCommentSection";
import UserShowSection from "./../UserShowSection";

function UserInformation(props) {

    const currentUser = useUserProfileContext().profile;

    const comments = props.comments;

    function getUsersComments() {

    }

    return (
        <div className='user-info'>
            <div className='profile-picture-div'>
                <img className='profile-picture' src={currentUser.profilePicture} alt='Profile Picture'></img>
            </div>
            <div className='username-div'>
                <h1>Username: {currentUser.username}</h1>
                <button className='edit-link' href="">Change Username</button>
                <button className='edit-link' href="">Change Password</button>
                <button className='edit-link' href="">Delete Account</button>
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