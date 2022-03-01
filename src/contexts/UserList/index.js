import React from "react";
import { useState, useEffect, createContext, useContext } from "react";

export const userListDefaultValues = {
    users: {},
    setUsers: () => {},
}

export const userListContext = createContext(userListDefaultValues);

export function useUserListContext(){
    // import this to files
    return useContext(userListContext);
}

export function useProvideUserListContext(){
    const [users, setUsers] = useState({});

    useEffect(() => {
        // initial call to set list of users with default
        const defaultlist = {
            0: {username: 'admin', password: 'admin', profilePicture: '/images/profile-picture.jpg', isAdmin: true, userId: 0},
            1: {username: 'user', password: 'user', profilePicture: '/images/profile-picture-2.jpg', isAdmin: false, userId: 1}
        }

        setUsers(defaultlist);
    }, [])



    return{
        users,
        setUsers
    }
}

export function ProvideUserListContext({children}){
    const userlist = useProvideUserListContext()
    return (
        <userListContext.Provider value={userlist}>
            {children}
        </userListContext.Provider>
    )
}
