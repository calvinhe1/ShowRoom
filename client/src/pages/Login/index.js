import React, {useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';

import './styles.css'

import { useUserProfileContext } from '../../contexts/UserProfile';
import { useUserListContext } from '../../contexts/UserList';


function Login() {
    const navigate = useNavigate();
    const [loginInfo, setLoginInfo] = useState({username: "", password: ""})

    const userProfile = useUserProfileContext();
    const userList = useUserListContext();

    function handleLogin(e){
        // currently checks through list of all users for one that matches loginInfo
        // will change this when we add backend for api calls
        
        e.preventDefault(); //prevent refresh

        let loginSuccess = false;
        for (let key in userList.users){
            let current = userList.users[key];

            if (loginInfo.username === current.username && loginInfo.password === current.password){
                loginSuccess = true;
                userProfile.setProfile(userList.users[key])
                break;
            }
            
        }

        if (loginSuccess){
            userProfile.setIsLoggedIn(true)

            navigate("/")   ;

        } else {
            alert("incorrect credentials, please try again")
        }
        
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

                <button type="submit" className='formField' id='loginButton' onClick={handleLogin}>Login</button>

                <Link to="/signup">
                    <p id='signupLink'>Click here to signup!</p>
                </Link>

            </form>
        </div>
    );
}

export default Login;