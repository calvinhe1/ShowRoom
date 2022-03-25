import React from "react";
import { useState, useEffect, createContext, useContext } from "react";
import { createUser, loginUser, logoutUser } from "../../actions/user";

export const userProfileDefaultValues = {
    // set default export states and functions here
    profile: {}, 
    login: () => {},
    logout: () => {},
    signUp: () => {},
}
export const userProfileContext = createContext(userProfileDefaultValues);

export function useUserProfileContext(){
    // import this to files that need this context
    return useContext(userProfileContext);
}

export function useProvideUserProfileContext(){
    // set main functions and states here
    const [profile, setProfile] = useState({});

    function login(loginInfo) {
        loginUser(loginInfo, setProfile);
    }

    function logout() {
        logoutUser(setProfile);
    }

    function signUp(loginInfo) {
        createUser(loginInfo, setProfile);
    }

    return {
        profile,
        login,
        logout,
        signUp,
    }

}

export function ProvideUserProfileContext({children}){
    // import this to App.js so that this context is accessible by its children
    const profile = useProvideUserProfileContext()

    return (
        <userProfileContext.Provider value={profile}>
            {children}
        </userProfileContext.Provider>
    )
}




