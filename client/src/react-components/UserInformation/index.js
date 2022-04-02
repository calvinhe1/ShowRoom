import "./styles.css"

import {useState} from "react";
import { getUserInfo, modifyUser, removeUser } from "../../actions/user";
import { useNavigate } from 'react-router-dom';
import { useUserProfileContext } from "../../contexts/UserProfile";

function UserInformation(props) {

    const navigate = useNavigate();

    const userProfile = useUserProfileContext();
    
    const [user, setUser] = useState({});
    if (Object.keys(user).length === 0) {
        getUserInfo(props._id).then((res) => {
            setUser(res);
        });
    }

    const changeUser = function(e) {
        e.preventDefault();
        user[e.target.name] = e.target.value;
        setUser(Object.assign({}, user));
    }    

    function changeUsername(e) {
        e.preventDefault();
        modifyUser({'username': user.username, '_id': user._id }).then(() => {
            alert('Username Changed');
        });
    }

    function changePassword(e) {
        e.preventDefault();
        modifyUser({'password': user.password, '_id': user._id }).then(() => {
            alert('Password Changed');
        });
    }

    function changeBio(e) {
        e.preventDefault();
        modifyUser({'bio': user.bio, '_id': user._id }).then(() => {
            alert('Bio Changed');
        });
    }

    const deleteAccount = function(e) {
        e.preventDefault();
        if (window.confirm("Are you sure you wish to delete your account forever? This cannot be undone")){
            removeUser(user._id);
            userProfile.setProfile({});
            navigate('/');
        }
    }

    return (
        <div className='user-info'>
            <span>
                <img className='user-info-pic' src={user.profilePicture} alt='Profile Picture'></img>
            </span>
            <table className='user-info-container'>
                <tr className="user-info-input">
                    <th>
                        <label>Username</label>
                    </th>
                    <th>
                        <input type="text" value={user.username} name="username" onChange={changeUser}></input> 
                    </th>
                    <th>
                        <button className="edit-button" onClick={changeUsername}>Change Username</button>
                    </th>
                </tr>

                <tr>
                    <th>
                        <label>Password</label>
                    </th>
                    <th>
                        <input type="password" name="password" value={user.password} onChange={changeUser}></input>
                    </th>
                    <th>
                        <button className="edit-button" onClick={changePassword}>Change Password</button>
                    </th>
                </tr>

                <tr>
                    <th>
                        <label>Bio</label>
                    </th>
                    <th>
                        <textarea value={user.bio} name="bio" onChange={changeUser}></textarea>
                    </th>
                    <th>
                        <button className="edit-button" onClick={changeBio}>Change Bio</button>
                    </th>
                </tr>

                <tr className="user-bottom-row">
                        <button className="edit-button" onClick={deleteAccount}>Delete Account</button>
                </tr>
            </table>
        </div>
    );
}

export default UserInformation;