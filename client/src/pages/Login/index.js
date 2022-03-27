import React, {useState} from 'react';
import { Link } from 'react-router-dom';

import './styles.css'

import { useUserProfileContext } from '../../contexts/UserProfile';

function Login() {
    const [loginInfo, setLoginInfo] = useState({email: "", password: ""})

    const userProfile = useUserProfileContext();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setLoginInfo((prevState) => {
            return {
            ...prevState,
            [name]: value,
            };
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        userProfile.login(loginInfo);
    }

    return (
        <div>
            <form id='loginForm'>
                <label className='formField' id="email">Email</label><br/>
                <input type="text" 
                    className='formField textInput'
                    placeholder="Enter Email"
                    value={loginInfo.email} 
                    onChange={handleChange} 
                    name="email" required>
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