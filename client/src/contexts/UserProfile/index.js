import React from "react";
import { useState, useEffect, createContext, useContext } from "react";
import { createUser, getUserInfo, loginUser, logoutUser } from "../../actions/user";

export const userProfileDefaultValues = {
    // set default export states and functions here
    profile: {}, 
    login: () => {},
    logout: () => {},
    signUp: () => {},
    getUser: () => {}
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
        return loginUser(loginInfo, setProfile);
    }

    function logout() {
        logoutUser(setProfile);
    }

    function signUp(loginInfo) {
        return createUser(loginInfo, setProfile);
    }

    function getUser(id) {
        return getUserInfo(id);
    }

    return {
        profile,
        login,
        logout,
        signUp,
        getUser
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




