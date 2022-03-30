import React, {useState} from 'react';
import { useNavigate, Link} from 'react-router-dom';

import './styles.css';

import { useUserProfileContext } from '../../contexts/UserProfile';

function Signup() {
    const navigate = useNavigate();
    const [loginInfo, setLoginInfo] = useState({email: "", password: ""})

    const userProfile = useUserProfileContext();

    function handleSignup(e){
        e.preventDefault();
        userProfile.signUp(loginInfo)
        .then((res) => {
            console.log(res);
            navigate('/profile/' + res._id);
        });
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

                <button type="submit" className='formField' id='signupButton' onClick={handleSignup}>Sign Up</button>

                <Link to="/login">
                    <p id='loginLink'>Already have an account? Login here!</p>
                </Link>
            </form>
        </div>
    );
}

export default Signup;