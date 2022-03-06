import React, {useState} from 'react';
import { useNavigate, Link} from 'react-router-dom';

import './styles.css'

import { useUserProfileContext } from '../../contexts/UserProfile';
import { useUserListContext } from '../../contexts/UserList';


function Signup() {
    const navigate = useNavigate();
    const [loginInfo, setLoginInfo] = useState({username: "", password: ""})

    const userProfile = useUserProfileContext();
    const userList = useUserListContext();

    function handleSignup(e){
        // creates a temporary user login credential that is not stored; will change in phase 2
        
        e.preventDefault(); //prevent refresh
        let current = {userId: 2,
            username: loginInfo.username,
            password: loginInfo.password,
            profilePicture: '/images/profile-picture-2.jpg',
            isAdmin: false}

        userProfile.setProfile(current);
        userProfile.setIsLoggedIn(true);

        alert("A temporary profile has been created");
        navigate("/");
        
    }


    const handleChange = (event) => {
        const { name, value } = event.target;
        setLoginInfo((prevState) => {
          return {
            ...prevState,
            [name]: value,
          };
        });
      };


    return (
        <div>
            <form id='loginForm'>
                <label className='formField' id="username">Username</label><br/>
                <input type="text" 
                    className='formField textInput'
                    placeholder="Enter Username"
                    value={loginInfo.username} 
                    onChange={handleChange} 
                    name="username" required>
                </input><br/>

                <label className='formField' id="password">Password</label><br/>
                <input type="password" 
                    className='formField textInput'
                    placeholder="Enter Password" 
                    value={loginInfo.password} 
                    onChange={handleChange}
                    name="password" required>

                </input><br/>

                <button type="submit" className='formField' id='signupButton' onClick={handleSignup}>Login</button>

                <Link to="/login">
                    <p id='loginLink'>Already have an account? Login here!</p>
                </Link>
            </form>
        </div>
    );
}

export default Signup;