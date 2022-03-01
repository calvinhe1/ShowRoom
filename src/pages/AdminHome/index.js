import "./styles.css"
import {Link} from 'react-router-dom';
import UserList from "../UserList";
import ShowList from "../ShowList";
import Profile from "../Profile";
import { showList, userList, commentList } from '../../local-data';
import { useState, useEffect, createContext, useContext } from "react";

function AdminHome() {
    return (
        <div>
            {
            <Link to="/admin_manage_users">
            <button className ="buttonsAdmin">Manage Users</button>
            </Link>
            }   

            {
            <Link to="/admin_manage_shows">
            <button className ="buttonsAdmin">Manage Shows</button>
            </Link>
            } 
        </div>
    );
}

function AdminManageShows() {
    return (
        <div>
            <h1>Shows in Database: </h1>
            {
            <Link to="/add_new_show">
            <button className="addButton"> Add new show </button>
            </Link>
            }

        </div>
    );


}

function AdminManageUsers() {
    return (
        <div>
            <h1>Users in Database: </h1>
            {
            <Link to="/add_new_user">
            <button className="addButton"> Add new user </button>
            </Link>
            }
        </div>
    );
}


function AddShow() {

   
    return (
        <div>
            <form id ="addForm">
                <label htmlFor="image">Picture:</label><br></br>
                <input type="file" name ="image"></input><br></br>

                <label htmlFor="title">Title:</label><br></br>
                <input type="text" name ="title"></input><br></br>

                <label htmlFor="genre">Genre:</label><br></br>
                <input type="text" name ="genre"></input><br></br>

                <label htmlFor="startDate">Start date:</label><br></br>
                <input type="date" name="startDate" min = "1950-01-01" max= "2030-03-05"></input><br></br>

                <label htmlFor="endDate">End date:</label><br></br>
                <input type="date" name="endDate" min = "1950-01-01" max= "2030-03-05"></input><br></br>

                <label htmlFor="description">Description: </label><br></br>
                <textarea rows = "5" cols="40" name="description"></textarea><br></br>

                <input type="submit"></input>
            </form>
        </div>
    );

}

function AddUser() {

    const [checkBox, setCheckBox] = useState(1);



    return (
        <div>
            <form id ="addForm">

                <label htmlFor="profilePicture">Profile picture:</label><br></br>
                <input type="file" name ="profilePicture"></input><br></br>

                <label htmlFor="userName">Username:</label><br></br>
                <input type="text" name ="userName"></input><br></br>

                <label htmlFor="pass">Password: </label><br></br>
                <input type="text" name ="pass"></input><br></br><br></br>

                <input type="submit"></input>
            </form>
        </div>
    );
}

export {AdminManageShows, AdminManageUsers, AdminHome, AddShow, AddUser};