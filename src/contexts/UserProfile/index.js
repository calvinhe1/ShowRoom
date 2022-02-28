import React from "react";
import { useState, useEffect, createContext, useContext } from "react";
import { userList } from "../../local-data";

export const userProfileDefaultValues = {
    // set default export states and functions here
    profile: {}, 
    setProfile: () => {},
    isLoggedIn: false,
    setIsLoggedIn: () => {}
}
export const userProfileContext = createContext(userProfileDefaultValues);

export function useUserProfileContext(){
    // import this to files that need this context
    return useContext(userProfileContext);
}

export function useProvideUserProfileContext(){
    // set main functions and states here
    const [profile, setProfile] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (isLoggedIn){
            //TODO actually figure out what user is logged in
            setProfile(userList[0])
        } else {
            setProfile({});
        }

    }, [isLoggedIn]);

    return {
        profile,
        setProfile,
        isLoggedIn,
        setIsLoggedIn
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




