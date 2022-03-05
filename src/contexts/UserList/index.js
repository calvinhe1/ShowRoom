import React from "react";
import { useState, useEffect, createContext, useContext } from "react";
import { userList } from "../../local-data";

export const userListDefaultValues = {
    users: {},
    setUsers: () => {},
    getUsers: () => {},
    getUserById: () => {}
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
        setUsers(userList);
    }, []);

    function getUsers() {
        return users;
    }

    function getUserById(id) {
        return users.find(user => user.userId === id);
    }

    return{
        users,
        setUsers,
        getUsers,
        getUserById
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
