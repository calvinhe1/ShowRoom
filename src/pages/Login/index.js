import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

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
            <form>
                <label for="username">Username</label>
                <input type="text" 
                    placeholder="Enter Username" 
                    value={loginInfo.username} 
                    onChange={handleChange} 
                    name="username" required>
                </input>

                {/* <br></br> */}

                <label for="password">Password</label>
                <input type="password" 
                    placeholder="Enter Password" 
                    value={loginInfo.password} 
                    onChange={handleChange}
                    name="password" required>

                </input>

                <button type="submit" onClick={handleLogin}>Login</button>
            </form>
        </div>
    );
}

export default Login;